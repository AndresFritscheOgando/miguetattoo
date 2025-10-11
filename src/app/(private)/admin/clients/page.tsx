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
import { ArrowUpDown, EyeIcon, PencilIcon, PlusIcon, Search, TrashIcon } from "lucide-react";
import { useState, useMemo } from "react";
import Modal from "./Modal";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SortField = 'full_name' | 'email' | 'created_at';
type SortDirection = 'asc' | 'desc';        

const ITEMS_PER_PAGE = 10;

export default function ClientsPage() {
    const [view, setView] = useState<ClientView>(undefined);
    const [client, setClient] = useState<Client | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<SortField>('full_name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    const clientRequest = useFetchClients();
    const deleteClient = useDeleteClient();

    const handleCreate = () => {
        setClient(undefined);
        setView('create');
    };

    const handleEdit = (client: Client) => {
        setClient(client);
        setView('edit');
    };

    const handleShow = (client: Client) => {
        setClient(client);
        setView('show');
    };

    const handleDelete = async (id: string) => {
        if (id) {
            if (confirm('Are you sure you want to delete this client?')) {
                await deleteClient.mutateAsync(id);
            }
        }
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredAndSortedClients = useMemo(() => {
        if (!clientRequest.data) return [];

        return clientRequest.data
            .filter(client => 
                client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.address?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                let comparison = 0;
                
                if (sortField === 'full_name') {
                    comparison = a.full_name.localeCompare(b.full_name);
                } else if (sortField === 'email') {
                    comparison = (a.email || '').localeCompare(b.email || '');
                } else if (sortField === 'created_at') {
                    comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                }
                
                return sortDirection === 'asc' ? comparison : -comparison;
            });
    }, [clientRequest.data, searchTerm, sortField, sortDirection]);

    const totalPages = Math.ceil(filteredAndSortedClients.length / ITEMS_PER_PAGE);
    const paginatedClients = filteredAndSortedClients.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    return (
        <main className="py-6 px-4 bg-slate-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-6 text-black">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold">Client Management</h1>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
                            <Input
                                type="search"
                                placeholder="Search clients..."
                                className="pl-10 w-full placeholder:text-black"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <Button 
                            className="bg-blue-600 hover:bg-blue-700 text-white" 
                            onClick={handleCreate}
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Client
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-100 text-black"
                                        onClick={() => handleSort('full_name')}
                                    >
                                        <div className="flex items-center text-black">
                                            Name
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                            {sortField === 'full_name' && (
                                                <span className="ml-1">
                                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-100 text-black"
                                        onClick={() => handleSort('email')}
                                    >
                                        <div className="flex items-center text-black">
                                            Email
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                            {sortField === 'email' && (
                                                <span className="ml-1">
                                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-black">Phone</TableHead>
                                    <TableHead className="text-black">Address</TableHead>
                                    <TableHead className="text-right text-black">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clientRequest.isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8">
                                            Loading clients...
                                        </TableCell>
                                    </TableRow>
                                ) : paginatedClients.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            {searchTerm ? 'No clients match your search' : 'No clients found'}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedClients.map((client: Client) => (
                                        <TableRow key={client.id} className="hover:bg-gray-50">
                                            <TableCell className="font-medium align-middle">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                        {client.full_name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{client.full_name}</div>
                                                        <div className="text-xs text-muted-foreground">ID: {client.id.substring(0, 6)}...</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-black align-middle">
                                                {client.email || '-'}
                                            </TableCell>
                                            <TableCell className="text-black align-middle">{client.phone || '-'}</TableCell>
                                            <TableCell className="max-w-[200px] truncate text-black align-middle">
                                                {client.address || '-'}
                                            </TableCell>
                                            <TableCell className="align-middle">
                                                <div className="flex justify-end gap-2">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="h-4 w-4"
                                                                >
                                                                    <circle cx="12" cy="12" r="1" />
                                                                    <circle cx="19" cy="12" r="1" />
                                                                    <circle cx="5" cy="12" r="1" />
                                                                </svg>
                                                                <span className="sr-only">Actions</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleShow(client)}>
                                                                <EyeIcon className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleEdit(client)}>
                                                                <PencilIcon className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem 
                                                                className="text-red-600"
                                                                onClick={() => handleDelete(client.id)}
                                                                disabled={deleteClient.isPending}
                                                            >
                                                                {deleteClient.isPending ? (
                                                                    <span className="h-4 w-4 animate-spin mr-2">↻</span>
                                                                ) : (
                                                                    <TrashIcon className="mr-2 h-4 w-4" />
                                                                )}
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <div className="border-t px-4 py-3 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                                <span className="font-medium">
                                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedClients.length)}
                                </span>{' '}
                                of <span className="font-medium">{filteredAndSortedClients.length}</span> clients
                            </div>
                            <Pagination className="m-0">
                                <PaginationContent>
                                    <PaginationItem>
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            <PaginationPrevious />
                                        </Button>
                                    </PaginationItem>
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        // Show first, last, and pages around current page
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <PaginationItem key={pageNum}>
                                                <PaginationLink
                                                    isActive={pageNum === currentPage}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className="cursor-pointer"
                                                >
                                                    {pageNum}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}
                                    <PaginationItem>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            <PaginationNext />
                                        </Button>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            </div>
            <Modal 
                client={client!} 
                view={view} 
                onClose={() => setView(undefined)} 
                onChangeView={setView}
            />
        </main>
    );

}