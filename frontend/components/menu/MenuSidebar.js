"use client";

import Link from 'next/link';

export default function MenuSidebar({ categories, activeCategory, onCategorySelect }) {
    return (
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col h-screen fixed left-0 top-0 z-10 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-zinc-800">
                <h1 className="text-2xl font-display font-bold text-thai-primary italic">Thai Kitchen</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Premium Cuisine</p>
            </div>
            <nav className="flex-1 overflow-y-auto sidebar-scroll py-4 px-3 space-y-1">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onCategorySelect(cat.id)}
                        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeCategory === cat.id
                                ? "bg-thai-primary text-white shadow-lg shadow-thai-primary/20"
                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800"
                            }`}
                    >
                        <span className="material-icons mr-3 text-lg">{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-100 dark:border-zinc-800">
                {/* Theme Toggle or Back Button could go here */}
            </div>
        </aside>
    );
}
