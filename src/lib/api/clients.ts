'use client'

import { supabase } from "../supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Client } from "../types/client";

const clients_key = "clients";


export const fetchClients = async() => {
    const { data, error } = await supabase
        .from("clients")
        .select("*")
    console.log(data, error)
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
    return useMutation({
        mutationFn:async(data: Partial<Client>) => {
            const response = await supabase
                .from("clients")
                .insert([data])
            return response
        },
    })   
}
export const useUpdateClient = (id: number, data: Partial<Client>) => {
    return useMutation({
        mutationFn: async () => {
            const response = await supabase
                .from("clients")
                .update(data)
                .eq("id", id)
            return response
        },
    })   
}

export const useDeleteClient = (id: number) => {
    return useMutation({
        mutationFn: async () => {
            const response = await supabase
                .from("clients")
                .delete()
                .eq("id", id)
            return response
        },
    })   
}


