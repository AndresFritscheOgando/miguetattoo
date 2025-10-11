'use client'

import { supabase } from "../supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Client } from "../types/client";
import { toast } from "@/hooks/use-toast";

const clients_key = "clients";

export type ClientView = 'show' | 'create' | 'edit' | undefined

export const fetchClients = async () => {
    const { data, error } = await supabase
        .from("clients")
        .select("*")
        .limit(20)
    if (error) {
        throw error;
    }
    return data;
};

export const useFetchClients = () => {
    
    const query =  useQuery({
        queryKey: [clients_key],
        queryFn: () => fetchClients(),
    });
    return {
        ...query,
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,
    }
}

export const useCreateClient = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: Omit<Client, 'id'>) => {
            const { data: newClient, error } = await supabase
                .from('clients')
                .insert(data)
                .select()
                .single();
                
            if (error) {
                throw error;
            }
            
            return newClient;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [clients_key] });
        },
        onError: (error) => {
            toast({
                title: 'Error creating client',
                description: error.message,
                variant: 'destructive',
            });
        },
    });
};
export const useUpdateClient = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: Client) => {
            const { id, ...updateData } = data;
            const { data: updatedClient, error } = await supabase
                .from('clients')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();
                
            if (error) {
                throw error;
            }
            
            return updatedClient;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [clients_key] });
        },
        onError: (error) => {
            toast({
                title: 'Error updating client',
                description: error.message,
                variant: 'destructive',
            });
        },
    });
}

export const useDeleteClient = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (id: string) => {
            return await supabase
                .from('clients')
                .delete()
                .eq('id', id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [clients_key] });
        },
        onError: (error) => {
            toast({
                title: error.message,
                description: "Error deleting client",
                variant: "destructive",
            });

        },
    });
};

