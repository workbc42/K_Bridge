'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useMenuItems } from '@/hooks/useMenuHooks';
import MenuCard from '@/components/menu/MenuCard';
import CartSidebar from '@/components/menu/CartSidebar';
import { useTheme } from 'next-themes';

const CATEGORIES = [
    { key: "all", name: { ko: "전체 메뉴", en: "All Menu", th: "เมนูทั้งหมด" }, icon: "restaurant" },
    { key: "rice_bowls", name: { ko: "덮밥류", en: "Rice Bowls", th: "อาหารจานเดียว" }, icon: "rice_bowl" },
    { key: "main", name: { ko: "메인요리", en: "Main Dish", th: "กับข้าว" }, icon: "dinner_dining" },
    { key: "noodle", name: { ko: "면 요리", en: "Noodles", th: "ก๋วยเตี๋ยว" }, icon: "ramen_dining" },
    { key: "soups_curries", name: { ko: "찌개·국·커리", en: "Soup & Curry", th: "ต้ม & แกง" }, icon: "soup_kitchen" },
    { key: "som_tam", name: { ko: "쏨땀", en: "Som Tam", th: "ส้มตำ" }, icon: "pestle" },
    { key: "isan", name: { ko: "이싼 음식", en: "Isan Food", th: "อาหารอีสาน" }, icon: "location_on" },
    { key: "yam", name: { ko: "얌", en: "Yam (Salad)", th: "ยำ" }, icon: "tapas" },
    { key: "fried_grilled", name: { ko: "튀김·구이", en: "Fried & Grilled", th: "ทอด & ย่าง" }, icon: "kebab_dining" },
    { key: "wraps_shabu_mukata", name: { ko: "쌈·샤브·무카타", en: "Wraps & Shabu", th: "เมี่ยง & จิ้มจุ่ม" }, icon: "set_meal" },
    { key: "special", name: { ko: "스페셜 메뉴", en: "Special", th: "เมนูพิเศษ" }, icon: "stars" },
    { key: "snacks_desserts", name: { ko: "간식·디저트", en: "Snack & Dessert", th: "ของว่าง & ของหวาน" }, icon: "icecream" },
    { key: "beverages", name: { ko: "음료", en: "Beverage", th: "เครื่องดื่ม" }, icon: "local_bar" }
];

const UI_TEXT = {
    ko: { search: "메뉴 검색...", no_result: "검색 결과가 없습니다.", title: "태국포차", subtitle: "Thai Kitchen", cart_title: "장바구니" },
    en: { search: "Search menu...", no_result: "No results found.", title: "Thai Pocha", subtitle: "Thai Kitchen", cart_title: "Cart" },
    th: { search: "ค้นหาเมนู...", no_result: "ไม่พบข้อมูล", title: "ร้านอาหารไทย", subtitle: "Thai Kitchen", cart_title: "ตะกร้าสินค้า" }
};

export default function MenuPage() {
    const { data: menuItems = [], isLoading, error } = useMenuItems();
    const [activeCategory, setActiveCategory] = useState("all");
    const [cart, setCart] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [lang, setLang] = useState('ko');
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Hydration fix for next-themes
    useEffect(() => setMounted(true), []);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('hphour_cart_v1');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('hphour_cart_v1', JSON.stringify(cart));
        }
    }, [cart, mounted]);

    const cartItems = useMemo(() => {
        return Object.entries(cart).map(([id, qty]) => {
            // Ensure ID comparison is correct (string vs number)
            const item = menuItems.find(i => String(i.id) === String(id));
            return item ? { item, qty } : null;
        }).filter(Boolean);
    }, [cart, menuItems]);

    const addToCart = (item) => {
        setCart(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
    };

    const updateQty = (id, delta) => {
        setCart(prev => {
            const currentQty = prev[id] || 0;
            const nextQty = currentQty + delta;

            if (nextQty <= 0) {
                const next = { ...prev };
                delete next[id];
                return next;
            }
            return { ...prev, [id]: nextQty };
        });
    };

    const removeItem = (id) => {
        setCart(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    };

    const clearCart = () => setCart({});

    const handleOrder = () => {
        alert(lang === 'ko' ? '주문 기능은 준비중입니다.' : 'Order feature coming soon.');
    };

    const filteredItems = useMemo(() => {
        let items = menuItems;
        if (activeCategory !== 'all') {
            items = items.filter(item => item.category === activeCategory);
        }
        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            items = items.filter(item =>
                item.name.toLowerCase().includes(q) ||
                (item.thai_name && item.thai_name.toLowerCase().includes(q))
            );
        }
        return items;
    }, [menuItems, activeCategory, searchTerm]);

    if (!mounted) return null; // Avoid hydration mismatch

    if (isLoading && menuItems.length === 0) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-stone-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-300">
            {/* 1. Category Sidebar (Left) */}
            <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-zinc-900 border-r border-stone-200 dark:border-zinc-800 overflow-y-auto shrink-0 z-20 shadow-xl">
                <div className="p-6 pb-2">
                    <h1 className="text-2xl font-black text-red-700 italic tracking-tighter cursor-pointer" onClick={() => setActiveCategory('all')}>
                        HAPPY HOUR
                    </h1>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.3em] pl-1 mt-1">
                        {UI_TEXT[lang].subtitle}
                    </p>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold flex items-center gap-3 transition-all duration-200 group
                                ${activeCategory === cat.key
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20 translate-x-1'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-slate-100'
                                }`}
                        >
                            <span className={`material-icons text-[20px] w-6 text-center ${activeCategory === cat.key ? 'text-white' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
                                {cat.icon}
                            </span>
                            <span className="flex-1 truncate">{cat.name[lang]}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* 2. Main Content (Center) */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                {/* Top Header */}
                <header className="flex-shrink-0 px-6 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-stone-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300">
                    {/* Mobile Logo */}
                    <div className="lg:hidden w-full flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-black text-red-700 italic tracking-tighter">HAPPY HOUR</h1>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Thai Kitchen</p>
                        </div>
                        <div className="flex gap-2">
                            {/* Mobile Theme Toggle */}
                            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300">
                                <span className="material-icons text-xl">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-lg">
                        <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            type="text"
                            placeholder={UI_TEXT[lang].search}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-red-500/50 text-sm font-medium transition-all"
                        />
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Lang Toggle */}
                        <div className="flex bg-slate-100 dark:bg-zinc-800 rounded-full p-1 border border-slate-200 dark:border-zinc-700">
                            {['ko', 'en', 'th'].map(l => (
                                <button
                                    key={l}
                                    onClick={() => setLang(l)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === l ? 'bg-white dark:bg-zinc-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                                        }`}
                                >
                                    {l.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            <span className="material-icons">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                    </div>
                </header>

                {/* Mobile Category Horizontal Scroll */}
                <div className="lg:hidden overflow-x-auto bg-white dark:bg-zinc-900 border-b border-stone-200 dark:border-zinc-800 scrollbar-hide">
                    <div className="flex p-4 gap-3">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setActiveCategory(cat.key)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeCategory === cat.key
                                    ? 'bg-red-600 text-white shadow-md'
                                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400'
                                    }`}
                            >
                                {cat.name[lang]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="flex-1 overflow-hidden relative bg-stone-50 dark:bg-black/50">
                    <div className="h-full overflow-y-auto p-4 md:p-6 lg:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-24 lg:pb-0">
                            {filteredItems.map(item => (
                                <MenuCard
                                    key={item.id}
                                    item={item}
                                    onAddToCart={addToCart}
                                    lang={lang}
                                />
                            ))}
                        </div>
                        {filteredItems.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                                <span className="material-icons text-4xl mb-2">restaurant_menu</span>
                                <p>{UI_TEXT[lang].no_result}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* 3. Cart Sidebar (Right) */}
            <aside className="w-96 bg-white dark:bg-zinc-900 border-l border-stone-200 dark:border-zinc-800 hidden xl:flex flex-col shadow-2xl z-30 relative shrink-0">
                <CartSidebar
                    items={cartItems}
                    onUpdateQty={updateQty}
                    onRemove={removeItem}
                    onClear={clearCart}
                    onOrder={handleOrder}
                    lang={lang}
                    uiText={UI_TEXT}
                />
            </aside>

            {/* Mobile Bottom Cart Bar (Simplified) */}
            <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase font-bold">{UI_TEXT[lang].cart_title}</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">
                        {cartItems.reduce((acc, curr) => acc + curr.qty, 0)} items
                    </span>
                </div>
                <button
                    onClick={() => document.querySelector('.cart-drawer')?.classList.toggle('translate-y-full')}
                    className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg"
                >
                    View Cart
                </button>
                {/* Note: A proper mobile drawer would go here, relying on desktop sidebar for now for simplicity instructions.*/}
            </div>
        </div>
    );
}
