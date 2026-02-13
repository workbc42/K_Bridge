"use client";

export default function MenuItem({ item, onAdd }) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-zinc-800 hover:shadow-md transition-shadow group flex gap-4">
            <div className="w-24 h-24 flex-shrink-0 bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt={item.name_en}
                    className="w-full h-full object-cover"
                    src={item.image || "https://placehold.co/100x100?text=No+Image"}
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg">{item.name_ko}</h4>
                        <span className="text-thai-primary font-bold">
                            {item.price.toLocaleString()}원
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-zinc-500 mb-1 font-thai">
                        {item.name_th}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 line-clamp-2">
                        {item.description_ko}
                    </p>
                </div>
                <div className="mt-2 flex justify-end">
                    <button
                        onClick={() => onAdd(item)}
                        className="p-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-thai-primary hover:text-white transition-colors"
                    >
                        <span className="material-icons text-sm">+</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
