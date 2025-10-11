import { useCreateClient, useUpdateClient } from "@/lib/api/clients";
import { Client } from "@/lib/types/client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface FormProps {
    client?: Client;
    onClose: () => void;
}

const FormPage = ({ client, onClose }: FormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Client>({
        defaultValues: client || {
            id: "",
            full_name: "",
            email: "",
            phone: "",
            address: "",
            image_url: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
    });

    const updateClient = useUpdateClient();
    const createClient = useCreateClient();

    const isLoading = updateClient.isPending || createClient.isPending;

    const onSubmitHandler = async (data: Client) => {
        try {
            if (client?.id) {
                await updateClient.mutateAsync({ ...data, id: client.id });
                toast.success("Client updated successfully");
            } else {
                await createClient.mutateAsync(data);
                toast.success("Client created successfully");
            }
            onClose();
        } catch (error) {
            console.error("Error saving client:", error);
            toast.error("Failed to save client. Please try again.");
        }
    };

    return (
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto my-8">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                    {client?.id ? 'Edit Client' : 'Add New Client'}
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="full_name">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="full_name"
                            type="text"
                            placeholder="John Doe"
                            className={errors.full_name ? 'border-red-500' : ''}
                            {...register("full_name", { required: "Full name is required" })}
                        />
                        {errors.full_name && (
                            <p className="text-sm text-red-500 mt-1">{errors.full_name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            className={errors.email ? 'border-red-500' : ''}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className={errors.phone ? 'border-red-500' : ''}
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                    message: "Invalid phone number"
                                }
                            })}
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                            Address
                        </label>
                        <Input
                            id="address"
                            type="text"
                            placeholder="123 Main St, City, Country"
                            {...register("address")}
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="image_url">
                            Profile Photo
                        </label>
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <Input
                                    id="image_url"
                                    type="file"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    accept="image/*"
                                    {...register("image_url")}
                                />
                            </div>
                        </div>
                        {client?.image_url && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Current:</p>
                                <div className="mt-1 flex items-center">
                                    <img
                                        src={client.image_url}
                                        alt="Profile"
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {client?.id ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            <>{client?.id ? 'Update Client' : 'Create Client'}</>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormPage;
