import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (item) => {
    const current = get().items
    const existing = current.find((entry) => entry.name === item.name)

    if (existing) {
      set({
        items: current.map((entry) =>
          entry.name === item.name
            ? { ...entry, quantity: entry.quantity + (item.quantity || 1) }
            : entry,
        ),
      })
      return
    }

    set({
      items: [...current, { ...item, quantity: item.quantity || 1 }],
    })
  },
  removeItem: (name) => {
    set({ items: get().items.filter((entry) => entry.name !== name) })
  },
  clearCart: () => set({ items: [] }),
  totalCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
}))
