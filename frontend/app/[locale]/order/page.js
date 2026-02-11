'use client'

import { useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { createOrder } from '@/lib/api/orders'
import { orderCreateSchema } from '@/lib/schemas/order'
import { useCartStore } from '@/store/useCartStore'
import { useTranslations } from '@/lib/i18n-client'

const parseMenuItems = (value) => {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((name) => ({ name, quantity: 1 }))
}

export default function OrderPage() {
  const { basePath } = useTranslations()
  const [submitError, setSubmitError] = useState('')
  const [createdOrder, setCreatedOrder] = useState(null)
  const { items, addItem, clearCart, totalCount } = useCartStore()

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      restaurantName: '',
      deliveryAddress: '',
      notes: '',
      menuText: '',
      totalPrice: 0,
    },
  })

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      setCreatedOrder(data)
      setSubmitError('')
      clearCart()
      reset()
    },
    onError: (error) => {
      setSubmitError(error?.response?.data?.message || '주문 생성에 실패했습니다.')
    },
  })

  const onSubmit = (values) => {
    const menuItems = parseMenuItems(values.menuText)
    const payload = {
      restaurantName: values.restaurantName,
      deliveryAddress: values.deliveryAddress,
      notes: values.notes,
      totalPrice: Number(values.totalPrice),
      menuItems,
    }

    const validated = orderCreateSchema.safeParse(payload)
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || '입력값을 확인하세요.'
      setSubmitError(message)
      return
    }

    menuItems.forEach((item) => addItem(item))
    mutation.mutate(validated.data)
  }

  const orderTimestamp = useMemo(() => {
    if (!createdOrder?.createdAt) return ''
    return format(new Date(createdOrder.createdAt), 'yyyy-MM-dd HH:mm:ss')
  }, [createdOrder])

  return (
    <div className="page-container">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Order</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">Create Order</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">MVP 주문 생성 폼입니다.</p>
          </div>
          <a className="ghost-btn" href={`${basePath}/dashboard/orders`}>
            Back to Orders
          </a>
        </header>

        <section className="dashboard-panel space-y-4">
          <h3>New Order</h3>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="filter-field">
              Restaurant
              <input {...register('restaurantName')} placeholder="Seoul Kitchen" />
            </label>
            <label className="filter-field">
              Address
              <input {...register('deliveryAddress')} placeholder="서울시 강남구 ..." />
            </label>
            <label className="filter-field">
              Menu (comma separated)
              <input {...register('menuText')} placeholder="Bibimbap, Kimchi stew" />
            </label>
            <label className="filter-field">
              Total Price
              <input type="number" {...register('totalPrice')} min="0" />
            </label>
            <label className="filter-field">
              Notes
              <textarea rows={3} {...register('notes')} placeholder="문 앞에 두고 벨 눌러주세요" />
            </label>

            {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}
            <div className="dashboard-actions">
              <button className="primary-btn" type="submit" disabled={mutation.isPending || formState.isSubmitting}>
                {mutation.isPending ? 'Submitting...' : 'Create Order'}
              </button>
            </div>
          </form>
        </section>

        <section className="dashboard-panel space-y-3">
          <h3>Cart Snapshot</h3>
          <p className="text-sm text-[color:var(--muted)]">Items: {totalCount()}</p>
          {items.length === 0 ? (
            <div className="panel-placeholder">No items in cart</div>
          ) : (
            <div className="detail-items">
              {items.map((item) => (
                <div key={item.name} className="detail-item">
                  <p className="detail-item-name">{item.name}</p>
                  <strong>x{item.quantity}</strong>
                </div>
              ))}
            </div>
          )}
        </section>

        {createdOrder ? (
          <section className="dashboard-panel space-y-2">
            <h3>Created</h3>
            <p className="text-sm">Order ID: {createdOrder.id}</p>
            <p className="text-sm">Status: {createdOrder.status}</p>
            <p className="text-sm">Created At: {orderTimestamp}</p>
          </section>
        ) : null}
      </div>
    </div>
  )
}
