"use client";

export default function CartSidebar({ cartItems, onRemove, onUpdateQuantity }) {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = 3000;
    const total = subtotal + deliveryFee;

    return (
        <aside className="w-80 flex-shrink-0 bg-white dark:bg-zinc-900 border-l border-slate-200 dark:border-zinc-800 flex flex-col h-screen fixed right-0 top-0 z-10">
            <div className="p-6 border-b border-slate-100 dark:border-zinc-800">
                <h3 className="text-lg font-bold flex items-center">
                    <span className="material-icons mr-2 text-thai-primary">shopping_cart</span>
                    내 주문 내역
                    <span className="ml-2 bg-thai-primary/10 text-thai-primary text-xs px-2 py-0.5 rounded-full">
                        {cartItems.length}
                    </span>
                </h3>
            </div>
            <div className="flex-1 overflow-y-auto sidebar-scroll p-6">
                <div className="space-y-6">
                    {cartItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex justify-between group">
                            <div className="flex-1">
                                <h5 className="font-medium text-sm">{item.name_ko}</h5>
                                {item.options && (
                                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                                        옵션: {item.options}
                                    </p>
                                )}
                                <div className="mt-2 flex items-center gap-3">
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                        className="w-6 h-6 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-zinc-800"
                                    >
                                        -
                                    </button>
                                    <span className="text-sm font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                        className="w-6 h-6 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-zinc-800"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm">
                                    {(item.price * item.quantity).toLocaleString()}원
                                </p>
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="text-xs text-red-500 mt-2 hover:underline"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                    {cartItems.length === 0 && (
                        <p className="text-center text-slate-400 py-10">
                            장바구니가 비어있습니다.
                        </p>
                    )}
                </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-zinc-800/50">
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm text-slate-500 dark:text-zinc-400">
                        <span>상품 합계</span>
                        <span>{subtotal.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500 dark:text-zinc-400">
                        <span>배달 요금</span>
                        <span>{deliveryFee.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-slate-200 dark:border-zinc-700 pt-2 mt-2">
                        <span>총 결제금액</span>
                        <span className="text-thai-primary">{total.toLocaleString()}원</span>
                    </div>
                </div>
                <button className="w-full bg-thai-primary text-white py-4 rounded-xl font-bold hover:bg-thai-primary/90 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-thai-primary/20">
                    주문하기
                </button>
            </div>
        </aside>
    );
}
