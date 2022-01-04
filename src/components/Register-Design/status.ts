export interface StatusItem {
  id?: number
  title: string
  className?: string
  show: boolean
}
export const status: StatusItem[] = [
  {
    id: 1,
    title: 'بارگذاری نشده',
    className: 'no-upload',
    show: false,
  },
  {
    id: 2,
    title: 'در انتظار تایید',
    className: 'wating-for-accept',
    show: true,
  },
  {
    id: 3,
    title: 'تایید کار',
    className: 'success-job',
    show: true,
  },
  {
    id: 4,
    title: 'کار شده',
    className: 'worked',
    show: true,
  },
  {
    id: 5,
    title: 'نیاز به اصلاح',
    className: 'need-edit',
    show: true,
  },
  {
    id: 6,
    title: 'تایید نهایی',
    className: 'final-accepted',
    show: true,
  },
  {
    id: 7,
    title: 'رد شده',
    className: 'rejected',
    show: true,
  },
  {
    id: 8,
    title: 'یتیم',
    className: 'no-upload',
    show: true,
  },
]
