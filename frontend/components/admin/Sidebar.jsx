'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const AdminSidebar = ({ onReset, lang, setLang }) => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const menuItems = [
        { name: { ko: '메뉴 관리', en: 'Menu Management', th: 'การจัดการเมนู' }, path: '/hphour/admin', icon: 'restaurant_menu' },
        { name: { ko: '대시보드', en: 'Dashboard', th: 'แผงควบคุม' }, path: '#', icon: 'dashboard' },
        { name: { ko: '설정', en: 'Settings', th: 'การตั้งค่า' }, path: '#', icon: 'settings' },
    ];

    const UI_TEXT = {
        reset: { ko: '데이터 초기화', en: 'Reset Data', th: 'รีเซ็ตข้อมูล' },
        admin: { ko: '관리자', en: 'Admin', th: 'ผู้ดูแลระบบ' }
    };

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 h-screen sticky top-0 border-r border-slate-800 shadow-xl z-50">
            <div className="p-6">
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="material-icons text-red-500">admin_panel_settings</span>
                    {UI_TEXT.admin[lang]}
                </h1>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === `/${lang}${item.path}`;
                    return (
                        <Link
                            key={item.name[lang]}
                            href={`/${lang}${item.path}`}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-slate-800 text-white shadow-md'
                                : 'hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <span className="material-icons text-[20px]">{item.icon}</span>
                            {item.name[lang]}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 space-y-4 border-t border-slate-800 bg-slate-900/50">
                {/* Controls */}
                <div className="flex items-center justify-between gap-2 bg-slate-800/50 p-2 rounded-lg">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        title="Toggle Theme"
                    >
                        <span className="material-icons text-lg">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                    </button>

                    {/* Lang Toggle */}
                    <div className="flex gap-1">
                        {['ko', 'en', 'th'].map(l => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`text-xs font-bold px-2 py-1 rounded ${lang === l ? 'bg-slate-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onReset}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-900/20 text-red-400 hover:bg-red-900/40 transition-colors text-sm font-bold border border-red-900/30"
                >
                    <span className="material-icons text-sm">restart_alt</span>
                    {UI_TEXT.reset[lang]}
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
