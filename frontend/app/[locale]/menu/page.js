"use client";

import { useState, useMemo } from 'react';
import MenuSidebar from '../../../components/menu/MenuSidebar';
import CartSidebar from '../../../components/menu/CartSidebar';
import MenuItem from '../../../components/menu/MenuItem';
import { CATEGORIES, MENU_ITEMS } from '../../../components/menu/menuData';

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);

    // Filter items by category and search query
    const filteredItems = useMemo(() => {
        return MENU_ITEMS.filter((item) => {
            const matchesCategory = item.categoryId === activeCategory;
            const matchesSearch =
                item.name_ko.includes(searchQuery) ||
                item.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description_ko.includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    // Cart operations
    const addToCart = (item) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prev) => prev.filter((i) => i.id !== itemId));
    };

    const updateQuantity = (itemId, delta) => {
        setCart((prev) =>
            prev.map((i) => {
                if (i.id === itemId) {
                    const newQty = Math.max(1, i.quantity + delta);
                    return { ...i, quantity: newQty };
                }
                return i;
            })
        );
    };

    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-black text-slate-800 dark:text-slate-100 font-sans">
            {/* Left Sidebar */}
            <MenuSidebar
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onCategorySelect={setActiveCategory}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-zinc-950 p-8 ml-64 mr-80">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">오늘의 추천 메뉴</h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            태국 본토의 맛을 그대로 전달해 드립니다.
                        </p>
                    </div>
                    <div className="relative w-72">
                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            search
                        </span>
                        <input
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-thai-primary/20"
                            placeholder="메뉴 검색..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </header>

                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <h3 className="text-xl font-bold mr-4">
                            {CATEGORIES.find((c) => c.id === activeCategory)?.name}
                        </h3>
                        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-zinc-800"></div>
                    </div>

                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                            {filteredItems.map((item) => (
                                <MenuItem key={item.id} item={item} onAdd={addToCart} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-400">
                            <p>해당 카테고리에 메뉴가 없습니다.</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Right Sidebar (Cart) */}
            <CartSidebar
                cartItems={cart}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
            />
        </div>
    );
}
