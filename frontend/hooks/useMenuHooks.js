import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../lib/api/menu';

export const useMenuItems = () => {
    return useQuery({
        queryKey: ['menuItems'],
        queryFn: getMenuItems,
    });
};

export const useCreateMenuItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuItems'] });
        },
    });
};

export const useUpdateMenuItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateMenuItem(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuItems'] });
        },
    });
};

export const useDeleteMenuItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuItems'] });
        },
    });
};
