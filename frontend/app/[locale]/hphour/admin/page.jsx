'use client';

import React, { useState, useEffect } from 'react';
import { useMenuItems, useCreateMenuItem, useUpdateMenuItem, useDeleteMenuItem } from '@/hooks/useMenuHooks';
import AdminMenuTable from '@/components/admin/AdminMenuTable';
import MenuFormModal from '@/components/admin/MenuFormModal';
import AdminSidebar from '@/components/admin/Sidebar';
import { resetMenu } from '@/lib/api/menu';
import { useQueryClient } from '@tanstack/react-query';

const UI_TEXT = {
    ko: {
        title: "메뉴 관리",
        subtitle: "메뉴 아이템의 가격과 정보를 관리하세요.",
        add_btn: "새 메뉴 추가",
        search: "메뉴 검색...",
        reset_confirm: "경고: 모든 메뉴 데이터가 삭제되고 초기 상태로 복구됩니다. 계속하시겠습니까?",
        reset_success: "메뉴 데이터가 초기화되었습니다.",
        reset_fail: "초기화 실패: ",
        delete_confirm: "정말 삭제하시겠습니까?"
    },
    en: {
        title: "Menu Management",
        subtitle: "Manage your menu items, prices, and availability.",
        add_btn: "Add New Item",
        search: "Search items...",
        reset_confirm: "WARNING: This will delete ALL current menu items and restore the default data. Are you sure?",
        reset_success: "Menu has been reset to default data.",
        reset_fail: "Reset failed: ",
        delete_confirm: "Are you sure you want to delete this item?"
    },
    th: {
        title: "การจัดการเมนู",
        subtitle: "จัดการรายการเมนู ราคา และความพร้อมให้บริการ",
        add_btn: "เพิ่มเมนูใหม่",
        search: "ค้นหาเมนู...",
        reset_confirm: "คำเตือน: ข้อมูลเมนูทั้งหมดจะถูกลบและกู้คืนค่าเริ่มต้น คุณแน่ใจหรือไม่?",
        reset_success: "รีเซ็ตข้อมูลเมนูเรียบร้อยแล้ว",
        reset_fail: "การรีเซ็ตล้มเหลว: ",
        delete_confirm: "คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?"
    }
};

export default function AdminMenuPage() {
    const { data: menuItems = [], isLoading, error } = useMenuItems();
    const createMutation = useCreateMenuItem();
    const updateMutation = useUpdateMenuItem();
    const deleteMutation = useDeleteMenuItem();
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [lang, setLang] = useState('ko');

    const handleCreate = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm(UI_TEXT[lang].delete_confirm)) {
            await deleteMutation.mutateAsync(id);
        }
    };

    const handleReset = async () => {
        if (confirm(UI_TEXT[lang].reset_confirm)) {
            try {
                await resetMenu();
                await queryClient.invalidateQueries(['menuItems']);
                alert(UI_TEXT[lang].reset_success);
            } catch (err) {
                alert(UI_TEXT[lang].reset_fail + err.message);
            }
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (editingItem) {
                await updateMutation.mutateAsync({ id: editingItem.id, data });
            } else {
                await createMutation.mutateAsync(data);
            }
            setIsModalOpen(false);
        } catch (err) {
            alert('Operation failed: ' + err.message);
        }
    };

    const filteredItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.thai_name && item.thai_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (isLoading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>;

    const t = UI_TEXT[lang];

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-black font-sans transition-colors duration-300">
            <AdminSidebar onReset={handleReset} lang={lang} setLang={setLang} />

            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{t.title}</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.subtitle}</p>
                        </div>
                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            <span className="material-icons text-sm">add</span>
                            {t.add_btn}
                        </button>
                    </div>

                    <div className="relative">
                        <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            type="text"
                            placeholder={t.search}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-sm pl-12 pr-4 py-3 rounded-xl border-none ring-1 ring-slate-200 dark:ring-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-primary shadow-sm transition-all"
                        />
                    </div>

                    <AdminMenuTable
                        items={filteredItems}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </main>

            <MenuFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingItem}
            />
        </div>
    );
}
