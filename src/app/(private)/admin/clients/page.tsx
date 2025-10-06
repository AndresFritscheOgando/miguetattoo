'use client'

import { Client } from '@/lib/types/client';
import { useFetchClients } from '@/lib/api/clients';

export default function ClientsPage() {

    const clientRequest = useFetchClients()

    console.log(clientRequest.data)
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Clientes</h1>
            <ul className="space-y-4">
                {clientRequest.data?.map((client: Client) => (
                    <li key={client.id} className="p-4 border rounded-lg bg-white shadow-sm">
                        <p className="font-semibold text-lg">{client.full_name}</p>
                        <p className="text-gray-600">{client.email}</p>
                        {client.phone && <p className="text-gray-600">Tel: {client.phone}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}