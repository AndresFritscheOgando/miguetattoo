'use client'
import { Button } from "@/components/ui/button";
import { ClientView, useDeleteClient } from '@/lib/api/clients';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useFetchClients } from '@/lib/api/clients';
import { Client } from "@/lib/types/client";
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";

export default function ClientsPage() {

    const [view, setView] = useState<ClientView>(undefined)
    const [client, setClient] = useState<Client | undefined>(undefined)

    const clientRequest = useFetchClients()
    const deleteClient = useDeleteClient()


    const handleCreate = () => {
        setClient(undefined)
        setView('create')
    }

    const handleEdit = (client: Client) => {
        setClient(client);
        setView('edit');
    }

    const handleShow = (client: Client) => {
        setClient(client);
        setView('show');
    }
    const handleDelete = async (id: string) => {
        if(id){
            await deleteClient.mutateAsync(id)
        }
    }

    return (
        <main className="py-6 px-4 bg-slate-100">
            {clientRequest.isLoading ?? <p>Fetching Clients...</p>}
            <div className="max-w-7xl px-4 py-6 mx-auto text-black">
                <Button className="mb-4 text-white" variant="outline" onClick={handleCreate} size="icon">
                    <PlusIcon />
                </Button>
                <Table className="w-full border border-gray-600 rounded-lg">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow className="border border-gray-600">
                            <TableHead className="w-[100px] text-black">Nombre Completo</TableHead>
                            <TableHead className="text-black">Email</TableHead>
                            <TableHead className="text-black">Phone</TableHead>
                            <TableHead className="text-right text-black">Address</TableHead>
                            <TableHead className="text-right px-10 text-black">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border border-gray-600">
                        {clientRequest.data?.sort((a, b) => a.full_name.localeCompare(b.full_name)).map((client: Client) => (
                            <TableRow key={client.id}>
                                <TableCell className="font-medium text-black">{client.full_name}</TableCell>
                                <TableCell className="text-black">{client.email}</TableCell>
                                <TableCell className="text-black">{client.phone}</TableCell>
                                <TableCell className="text-right text-black">{client.address}</TableCell>

                                <TableCell className="text-right px-4 space-x-2">
                                    <Button className="text-white" variant="outline" size="icon" onClick={() => handleEdit(client)}>
                                        <PencilIcon className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        className="text-white"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(client.id)}
                                        disabled={deleteClient.isPending}
                                    >
                                        {deleteClient.isPending ? (
                                            <span className="h-4 w-4 animate-spin">↻</span>
                                        ) : (
                                            <TrashIcon className="h-4 w-4" />
                                        )}
    
                                    </Button>
                                    <Button className="ml-2 text-white" variant="outline" size="icon" onClick={() => handleShow(client)}>
                                        <EyeIcon className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        <Modal client={client!} view={view} onClose={() => setView(undefined)} onChangeView={setView}/>
        </main>
    );

}