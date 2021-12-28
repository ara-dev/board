export interface ProfileMenus {
  id: string
  title: string
  path: string
  icon: string
}

const menus: ProfileMenus[] = [
  {
    id: 'dashboard',
    title: 'طراحی های اخیر',
    icon: 'ion:alarm-outline',
    path: '/profile/dashboard',
  },
  {
    id: 'transactions',
    title: 'تراکنش ها واعتبارات من',
    icon: 'ion:wallet-outline',
    path: '/profile/transactions',
  },
  {
    id: 'orders',
    title: 'سفارش های من',
    icon: 'ion:receipt-outline',
    path: '/profile/orders',
  },
  {
    id: 'files',
    title: 'طرح های من',
    icon: 'ion:document-attach-outline',
    path: '/profile/files',
  },
  {
    id: 'accounting',
    title: 'حساب من',
    icon: 'ion:reader-outline',
    path: '/profile/accounting',
  },
  {
    id: 'important-dates',
    title: 'تاریخ های مهم',
    icon: 'ion:calendar-outline',
    path: '/profile/important-dates',
  },
  {
    id: 'addresses',
    title: 'آدرس های من',
    icon: 'ion:location-outline',
    path: '/profile/addresses',
  },
  {
    id: 'bookmark',
    title: 'علاقه مندی ها',
    icon: 'ion:bookmark-outline',
    path: '/profile/bookmark',
  },
  {
    id: 'register-design',
    title: 'خانه طراحان',
    icon: 'ion:images-outline',
    path: '/profile/register-design',
  },
]

export default menus
