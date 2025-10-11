import { useCreateClient, useUpdateClient } from "@/lib/api/clients";
import { Client } from "@/lib/types/client";
import { useForm } from "react-hook-form";


interface FormProps {
    client?: Client;
    onClose: () => void;
}


const FormPage = ({client, onClose}: FormProps) => {
    const { register, handleSubmit } = useForm<Client>({
        defaultValues: client || {
            id: "",
            full_name: "",
            email: "",
            phone: "",
            address: "",
            image_url: ""
        },
    });

    const updateClient = useUpdateClient()
    const createClient = useCreateClient()

    const isLoading = updateClient.isPending || createClient.isPending
    const onSubmitHandler = async (data: Client) => {
        try {
            if (client?.id) {
                await updateClient.mutateAsync(data);
            } else {
                await createClient.mutateAsync(data);
            }
            onClose();
        } catch (error) {
            console.error("Error saving client:", error);
        }
    }
    return (
        <form className="p-4 bg-white text-black" onSubmit={handleSubmit(onSubmitHandler)}> 
        <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 font-bold" htmlFor="full_name">Nombre Completo</label>
            <input type="text" placeholder="Nombre Completo" {...register("full_name", {required: "El nombre es requerido"})} />
        </div>
        <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 font-bold" htmlFor="email">Email</label>
            <input type="email" placeholder="Email" {...register("email", {required: "El email es requerido"})} />
        </div>
        <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 font-bold" htmlFor="phone">Telefono</label>
            <input type="tel" placeholder="Telefono" {...register("phone", {required: "El telefono es requerido"})} />
        </div>
        <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 font-bold" htmlFor="address">Direccion</label>
            <input type="text" placeholder="Direccion" {...register("address", {required: "La direccion es requerida"})} />
        </div>
        <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 font-bold" htmlFor="image_url">Foto</label>
            <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" placeholder="Foto" {...register("image_url", {required: "La foto es requerida"})} />
        </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-all " type="submit" disabled={isLoading}>Submit</button>
        </form>
    )
}

export default FormPage
