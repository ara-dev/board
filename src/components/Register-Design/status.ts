export interface StatusItem {
  id?: number
  title: string
  className?: string
}
export const status: StatusItem[] = [
  {
    id: 1,
    title: 'بارگذاری نشده',
    className: 'no-upload',
  },
  {
    id: 2,
    title: 'در انتظار تایید',
    className: 'wating-for-accept',
  },
  {
    id: 3,
    title: 'تایید کار',
    className: 'success-job',
  },
  {
    id: 4,
    title: 'کار شده',
    className: 'worked',
  },
  {
    id: 5,
    title: 'نیاز به اصلاح',
    className: 'need-edit',
  },
  {
    id: 6,
    title: 'تایید نهایی',
    className: 'final-accepted',
  },
  {
    id: 7,
    title: 'رد شده',
    className: 'rejected',
  },
  {
    id: 8,
    title: 'یتیم',
    className: 'no-upload',
  },
]
