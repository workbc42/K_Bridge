'use client';

import React from 'react';

const CartSidebar = ({ items, onUpdateQty, onRemove, onClear, onOrder, lang = 'ko', uiText }) => {
    const total = items.reduce((sum, { item, qty }) => sum + item.price * qty, 0);

    const t = {
        title: uiText?.[lang]?.cart_title || "Cart",
        subtitle: { ko: "메뉴를 추가하고 주문을 진행하세요.", en: "Add items and proceed to order.", th: "เพิ่มรายการและดำเนินการสั่งซื้อ" },
        empty: { ko: "장바구니가 비어 있습니다.", en: "Cart is empty.", th: "ตะกร้าว่างเปล่า" },
        total: { ko: "합계", en: "Total", th: "รวม" },
        clear: { ko: "비우기", en: "Clear", th: "ล้าง" },
        order: { ko: "주문하기", en: "Order", th: "สั่งซื้อ" },
        delete: { ko: "삭제", en: "Del", th: "ลบ" }
    };

    return (
        <React.Fragment>
            <div className="px-6 py-6 border-b border-stone-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="material-icons text-red-600">shopping_cart</span>
                    {t.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">{t.subtitle[lang]}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 dark:text-zinc-600">
                        <span className="material-icons text-6xl mb-4 opacity-20">shopping_basket</span>
                        <p className="text-sm font-medium">{t.empty[lang]}</p>
                    </div>
                ) : (
                    items.map(({ item, qty }) => (
                        <div key={item.id} className="relative group rounded-2xl border border-stone-100 dark:border-zinc-800 p-3 bg-white dark:bg-zinc-900/50 hover:border-red-100 dark:hover:border-red-900/30 transition-colors shadow-sm">
                            <div className="flex justify-between gap-3 mb-1">
                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{lang === 'th' ? item.thai_name : item.name}</span>
                                <span className="text-sm font-black text-red-600 shrink-0">{new Intl.NumberFormat('ko-KR').format(item.price * qty)}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-3 line-clamp-1 font-thai">{item.thai_name}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center bg-stone-100 dark:bg-zinc-800 rounded-lg p-1">
                                    <button
                                        onClick={() => onUpdateQty(item.id, -1)}
                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-white dark:bg-zinc-700 text-slate-600 dark:text-slate-300 shadow-sm hover:scale-105 active:scale-95 transition-all font-bold"
                                    >-</button>
                                    <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-slate-100">{qty}</span>
                                    <button
                                        onClick={() => onUpdateQty(item.id, 1)}
                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-white dark:bg-zinc-700 text-slate-600 dark:text-slate-300 shadow-sm hover:scale-105 active:scale-95 transition-all font-bold"
                                    >+</button>
                                </div>
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    {t.delete[lang]}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-6 border-t border-stone-100 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-950">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{t.total[lang]}</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{new Intl.NumberFormat('ko-KR').format(total)}<span className="text-sm font-normal ml-1">₩</span></span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={onClear}
                        className="col-span-1 py-3.5 rounded-xl border border-stone-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                    >
                        {t.clear[lang]}
                    </button>
                    <button
                        onClick={onOrder}
                        disabled={items.length === 0}
                        className="col-span-2 py-3.5 rounded-xl bg-red-600 text-white text-sm font-bold shadow-lg shadow-red-600/30 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex items-center justify-center gap-2"
                    >
                        <span>{t.order[lang]}</span>
                        <span className="material-icons text-sm">arrow_forward</span>
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CartSidebar;
