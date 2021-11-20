interface ProfileMenus {
  title: string
  path: string
  icon: string
}

const menus: ProfileMenus[] = [
  {
    title: 'طراحی های اخیر',
    icon: 'ion:alarm-outline',
    path: '/profile/dashboard',
  },
  {
    title: 'تراکنش ها واعتبارات من',
    icon: 'ion:wallet-outline',
    path: '/profile/transactions',
  },
  {
    title: 'سفارش ها',
    icon: 'ion:receipt-outline',
    path: '/profile/orders',
  },
  {
    title: 'طرح های من',
    icon: 'ion:document-attach-outline',
    path: '/profile/files',
  },
  {
    title: 'حساب من',
    icon: 'ion:reader-outline',
    path: '/profile/accounting',
  },
  {
    title: 'تاریخ های مهم',
    icon: 'ion:calendar-outline',
    path: '/profile/important-dates',
  },
  {
    title: 'آدرس های من',
    icon: 'ion:location-outline',
    path: '/profile/addresses',
  },
  {
    title: 'علاقه مندی ها',
    icon: 'ion:bookmark-outline',
    path: '/profile/bookmark',
  },
]

export default menus
