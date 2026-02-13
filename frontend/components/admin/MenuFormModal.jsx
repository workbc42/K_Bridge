'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

const CATEGORIES = [
    { key: "rice_bowls", name: "덮밥류" },
    { key: "main", name: "메인요리" },
    { key: "noodle", name: "면 요리" },
    { key: "soups_curries", name: "찌개·국·커리" },
    { key: "som_tam", name: "쏨땀" },
    { key: "isan", name: "이싼 음식" },
    { key: "yam", name: "얌" },
    { key: "fried_grilled", name: "튀김·구이 (안주류)" },
    { key: "wraps_shabu_mukata", name: "쌈 · 샤브샤브 · 무카타" },
    { key: "special", name: "스페셜 메뉴" },
    { key: "snacks_desserts", name: "간식 · 디저트" },
    { key: "beverages", name: "음료" }
];

const MenuFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialData || {
            name: '',
            thai_name: '',
            description: '',
            category: 'rice_bowls',
            price: 0,
            image_url: '',
            is_available: true
        }
    });

    // Reset form when initialData changes or modal opens
    React.useEffect(() => {
        if (isOpen) {
            reset(initialData || {
                name: '',
                thai_name: '',
                description: '',
                category: 'rice_bowls',
                price: 0,
                image_url: '',
                is_available: true
            });
        }
    }, [isOpen, initialData, reset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {initialData ? 'Edit Menu Item' : 'Add New Menu Item'}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800">
                        <span className="material-icons">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name (KO)</label>
                            <input
                                {...register('name', { required: 'Name is required' })}
                                className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Name (Thai)</label>
                            <input
                                {...register('thai_name')}
                                className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm font-thai"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                {...register('category')}
                                className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat.key} value={cat.key}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Price</label>
                            <input
                                type="number"
                                {...register('price', { required: 'Price is required', min: 0 })}
                                className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                            {...register('image_url')}
                            placeholder="/images/menu/..."
                            className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_available"
                            {...register('is_available')}
                            className="rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="is_available" className="text-sm">Available for order</label>
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90"
                        >
                            Save Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuFormModal;
