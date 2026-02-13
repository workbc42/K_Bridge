'use client';

import React from 'react';
import Image from 'next/image';

const MenuCard = ({ item, onAddToCart, lang = 'ko' }) => {
    const { name, thai_name, description, price, image_url } = item;
    const item_name = item.name; // Currently DB only has name (KO) and thai_name.
    // If DB had en_name, we could use lang to select.
    // For now, let's use name for KO/EN and thai_name for TH.

    // Fallback image handling could be improved, but using a placeholder for now
    const displayImage = image_url || '/images/placeholder.png';

    const btnText = {
        ko: "담기",
        en: "Add",
        th: "เพิ่ม"
    };

    return (
        <article className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm p-4 rounded-3xl border border-stone-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>

            <div className="w-full aspect-[4/3] flex-shrink-0 bg-stone-100 dark:bg-zinc-800 rounded-2xl overflow-hidden relative mb-4">
                {image_url ? (
                    <Image
                        src={image_url}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-stone-300 dark:text-zinc-700">
                        <span className="material-icons text-4xl">restaurant</span>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-bold text-lg leading-tight text-slate-900 dark:text-slate-100 break-keep">
                        {lang === 'th' && thai_name ? thai_name : name}
                    </h4>
                    <span className="text-red-600 font-black whitespace-nowrap bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg text-sm">
                        {new Intl.NumberFormat('ko-KR').format(price)}
                        <span className="text-xs ml-0.5">₩</span>
                    </span>
                </div>

                {lang !== 'th' && <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium font-thai mb-2">{thai_name}</p>}

                <p className="text-sm text-slate-400 dark:text-zinc-500 line-clamp-2 mb-auto leading-relaxed">{description}</p>

                <div className="mt-4 pt-4 border-t border-dashed border-stone-200 dark:border-zinc-800">
                    <button
                        onClick={() => onAddToCart(item)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-slate-900 hover:text-white dark:hover:text-white px-4 py-3 text-sm font-bold transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none"
                    >
                        <span className="material-icons text-sm">add_shopping_cart</span>
                        <span>{btnText[lang]}</span>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default MenuCard;
