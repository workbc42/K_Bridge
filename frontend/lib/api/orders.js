import { apiClient } from './client'

export const createOrder = async (payload) => {
  const { data } = await apiClient.post('/orders', payload)
  return data.order
}

export const listOrders = async (status) => {
  const { data } = await apiClient.get('/orders', {
    params: status ? { status } : undefined,
  })
  return data.orders || []
}

export const getOrderById = async (id) => {
  const { data } = await apiClient.get(`/orders/${id}`)
  return data.order
}
