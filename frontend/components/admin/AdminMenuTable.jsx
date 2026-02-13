'use client';

import React from 'react';
import Image from 'next/image';

const AdminMenuTable = ({ items, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm text-slate-600 dark:text-zinc-400">
                <thead className="bg-slate-50 dark:bg-zinc-800/50 text-xs uppercase text-slate-700 dark:text-zinc-300">
                    <tr>
                        <th className="px-6 py-3">Image</th>
                        <th className="px-6 py-3">Name (KO)</th>
                        <th className="px-6 py-3">Name (TH)</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="relative h-12 w-12 rounded-lg bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                                    {item.image_url ? (
                                        <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="48px" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full w-full text-xs text-slate-400">No Img</div>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{item.name}</td>
                            <td className="px-6 py-4 font-thai">{item.thai_name}</td>
                            <td className="px-6 py-4">{item.category}</td>
                            <td className="px-6 py-4">{new Intl.NumberFormat('ko-KR').format(item.price)}</td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="font-medium text-red-600 dark:text-red-400 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {items.length === 0 && (
                        <tr>
                            <td colSpan="6" className="px-6 py-10 text-center text-slate-500">
                                No menu items found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminMenuTable;
