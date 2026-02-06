export const mockOrders = [
  {
    id: 'ORD-2401',
    status: 'received',
    customer: 'John Doe',
    messenger: 'fb_108293',
    address: '서울시 강남구 테헤란로 123, 101동 501호',
    request: '문 앞에 두고 문자 주세요',
    orderDetail: '김치찌개 x1, 공기밥 x1, 콜라 x1',
    total: '13,000원',
    time: '14:32',
    thumbTone: 'tone-1',
    intentTag: '재주문',
    recentSummary: ['김치찌개 x1, 공기밥 x1', '제육볶음 x1', '순두부찌개 x1'],
    topItems: ['김치찌개', '공기밥', '콜라'],
    suggestedRequests: ['덜 맵게', '문 앞에 두고 문자'],
    items: [
      { name: '김치찌개', quantity: 1, price: '8,000원', options: '덜 맵게' },
      { name: '공기밥', quantity: 1, price: '1,000원' },
      { name: '콜라', quantity: 1, price: '2,000원' }
    ],
    history: [
      { id: 'ORD-2388', date: '2026-02-03', summary: '김치찌개 x1, 공기밥 x1', total: '9,000원' },
      { id: 'ORD-2361', date: '2026-01-28', summary: '제육볶음 x1', total: '8,500원' },
      { id: 'ORD-2349', date: '2026-01-20', summary: '순두부찌개 x1', total: '8,000원' }
    ]
  },
  {
    id: 'ORD-2402',
    status: 'received',
    customer: 'Emma Chen',
    messenger: 'ig_552901',
    address: '서울시 송파구 올림픽로 55',
    request: '계단 X, 엘리베이터 사용',
    orderDetail: '짜장면 x1, 탕수육(소) x1',
    total: '21,000원',
    time: '14:40',
    thumbTone: 'tone-2',
    intentTag: '추천',
    recentSummary: ['짜장면 x1', '짬뽕 x1', '탕수육(소) x1'],
    topItems: ['짜장면', '탕수육(소)', '짬뽕'],
    suggestedRequests: ['계단 X, 엘리베이터 사용'],
    items: [
      { name: '짜장면', quantity: 1, price: '7,000원' },
      { name: '탕수육(소)', quantity: 1, price: '14,000원' }
    ],
    history: [
      { id: 'ORD-2395', date: '2026-02-05', summary: '짬뽕 x1', total: '8,000원' },
      { id: 'ORD-2368', date: '2026-01-29', summary: '짜장면 x1', total: '7,000원' }
    ]
  },
  {
    id: 'ORD-2403',
    status: 'processing',
    customer: 'Mike Lee',
    messenger: 'fb_330194',
    address: '서울시 마포구 월드컵북로 28',
    request: '덜 맵게',
    orderDetail: '닭갈비 x1, 치즈 추가',
    total: '16,500원',
    time: '14:18',
    thumbTone: 'tone-3',
    intentTag: null,
    recentSummary: ['닭갈비 x1', '치즈 추가', '볶음밥 x1'],
    topItems: ['닭갈비', '치즈 추가'],
    suggestedRequests: ['덜 맵게'],
    items: [
      { name: '닭갈비', quantity: 1, price: '13,000원', options: '덜 맵게' },
      { name: '치즈 추가', quantity: 1, price: '3,500원' }
    ],
    history: [
      { id: 'ORD-2358', date: '2026-01-26', summary: '닭갈비 x1', total: '13,000원' }
    ]
  },
  {
    id: 'ORD-2404',
    status: 'processing',
    customer: 'Sarah Park',
    messenger: 'ig_830144',
    address: '서울시 용산구 이태원로 155',
    request: '포크 추가',
    orderDetail: '쌀국수 x2, 짜조 x1',
    total: '24,000원',
    time: '14:12',
    thumbTone: 'tone-4',
    intentTag: '추천',
    recentSummary: ['쌀국수 x2', '짜조 x1', '분짜 x1'],
    topItems: ['쌀국수', '짜조', '분짜'],
    suggestedRequests: ['포크 추가'],
    items: [
      { name: '쌀국수', quantity: 2, price: '18,000원' },
      { name: '짜조', quantity: 1, price: '6,000원' }
    ],
    history: [
      { id: 'ORD-2373', date: '2026-01-31', summary: '분짜 x1', total: '12,000원' }
    ]
  },
  {
    id: 'ORD-2405',
    status: 'completed',
    customer: 'David Kim',
    messenger: 'fb_991203',
    address: '서울시 서초구 강남대로 465',
    request: '벨 눌러주세요',
    orderDetail: '족발(중) x1, 막국수 x1',
    total: '36,000원',
    time: '13:40',
    thumbTone: 'tone-5',
    intentTag: '재주문',
    recentSummary: ['족발(중) x1', '막국수 x1', '보쌈(중) x1'],
    topItems: ['족발(중)', '막국수', '보쌈(중)'],
    suggestedRequests: ['벨 눌러주세요'],
    items: [
      { name: '족발(중)', quantity: 1, price: '28,000원' },
      { name: '막국수', quantity: 1, price: '8,000원' }
    ],
    history: [
      { id: 'ORD-2321', date: '2026-01-18', summary: '보쌈(중) x1', total: '30,000원' }
    ]
  },
  {
    id: 'ORD-2406',
    status: 'completed',
    customer: 'Aiko Tanaka',
    messenger: 'ig_441278',
    address: '서울시 성동구 왕십리로 22',
    request: '젓가락 2개',
    orderDetail: '샐러드 x1, 샌드위치 x1',
    total: '18,000원',
    time: '13:22',
    thumbTone: 'tone-6',
    intentTag: null,
    recentSummary: ['샐러드 x1', '샌드위치 x1'],
    topItems: ['샐러드', '샌드위치'],
    suggestedRequests: ['젓가락 2개'],
    items: [
      { name: '샐러드', quantity: 1, price: '9,000원' },
      { name: '샌드위치', quantity: 1, price: '9,000원' }
    ],
    history: [
      { id: 'ORD-2338', date: '2026-01-22', summary: '샐러드 x1', total: '9,000원' }
    ]
  }
]
