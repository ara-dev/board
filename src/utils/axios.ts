import { useOnline } from '@vueuse/core'
import { notification } from 'ant-design-vue'
import axios from 'axios'
import { baseURLApi as baseURL } from '../../themeConfig'
import { userStore } from '../model/user'

export enum ErrorMessageMode {
  none,
  message,
  modal,
  notification,
}

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const _axios = axios.create({
  baseURL,
  headers,
})

_axios.interceptors.request.use(
  (config) => {
    const online = useOnline()
    if (!online.value) {
      notification.info({
        message: 'خطا در برقراری ارتباط با سرور',
        description: 'اتصال دستگاه به اینترنت را بررسی نمایید',
      })
      return false
    }
    //console.log('this is ful filled on interceptors.request', config)
    if (config.headers) {
      config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    }
    return config
  },
  (error) => {
    //console.log('this is error on interceptors.request', error)
    Promise.reject(error)
  },
)

_axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.log('this is ful filled on interceptors.response', response)
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //console.log('this is error on interceptors.response', error.response)
    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.data?.error?.message ?? ''
    checkStatus(error?.response?.status, msg)
    return Promise.reject(error)
  },
)

function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = ErrorMessageMode.message,
): void {
  let errMessage = ''
  switch (status) {
    // (Bad Request)
    case 400:
      errMessage = `${msg}`
      break
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      errMessage = msg || 'توکن نامعتبر می باشد'
      userStore.logout()
      break
    case 403:
      errMessage = 'دسترسی غیر مجاز'
      break
    case 404:
      errMessage = 'منبع درخواستی پیدا نشد'
      break
    case 405:
      errMessage = 'متد غیر مجاز'
      break
    case 408:
      errMessage = 'پایان حداکثر زمان درخواست'
      break
    case 409:
      errMessage = 'تعارض'
      break
    case 500:
      errMessage = 'خطای داخلی سرور '
      break
    case 501:
      errMessage = 'سرور قادر به پردازش درخواست واسط کاربری  نیست'
      break
    case 502:
      errMessage = 'خطای 502 به دلیل عدم دریافت پاسخ از سرورهای بالادست (upstream) است'
      break
    case 503:
      errMessage = 'سرویس خارج از دسترس'
      break
    case 504:
      errMessage =
        'سرور به عنوان یک دروازه میانجی (Gateway) قادر به دریافت پاسخ از سرورهای بالا دست (upstream) در حداکثر زمان مجاز نیست.'
      break
    case 505:
      errMessage = 'نسخه HTTP پشتیبانی نمی شود'
      break
    default:
  }

  if (errMessage) {
    if (errorMessageMode === ErrorMessageMode.modal) {
      console.log(errMessage)
      //createErrorModal({ title: t('sys.api.errorTip'), content: errMessage })
    } else if (errorMessageMode === ErrorMessageMode.message) {
      console.log(errMessage)
      //error({ content: errMessage, key: `global_error_message_status_${status}` })
    } else if (errorMessageMode === ErrorMessageMode.notification) {
      console.log(errMessage)
    }
  }
}

export default _axios
