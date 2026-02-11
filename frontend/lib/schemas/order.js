import { z } from 'zod'

export const orderItemSchema = z.object({
  name: z.string().min(1, '메뉴명을 입력하세요.'),
  quantity: z.coerce.number().int().min(1, '수량은 1 이상이어야 합니다.'),
})

export const orderCreateSchema = z.object({
  restaurantName: z.string().min(1, '가게명을 입력하세요.'),
  deliveryAddress: z.string().min(5, '배달 주소를 입력하세요.'),
  notes: z.string().optional(),
  menuItems: z.array(orderItemSchema).min(1, '최소 1개 메뉴가 필요합니다.'),
  totalPrice: z.coerce.number().int().nonnegative(),
})

