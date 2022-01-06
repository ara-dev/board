import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly } from 'vue'
import router from '../router'
import axios from '../utils/axios'

interface User {
  _id: string
  name: string
  password: string
  mobile: string
  type: string
  updated_at: string
  created_at: string
  avatar: string
  token: string
}

export default class UserStore {
  constructor() {
    this._init()
    this._state = reactive(this._state)
  }

  private _state!: UnwrapNestedRefs<User>

  get state(): DeepReadonly<User> {
    return readonly(this._state)
  }

  async login(mobile: string, password: string) {
    const { data } = await axios.post('auth/login', {
      mobile,
      password,
    })
    localStorage.setItem('token', data.token)
    Object.assign(userStore._state, data)
    console.log('login data', userStore._state)
  }

  async getUserInfo() {
    const token = localStorage.getItem('token')
    if (token) {
      const { data } = await axios.get('auth/me')
      Object.assign(userStore._state, data.data)
      //console.log('me data', userStore._state)
    }
  }

  async logout() {
    localStorage.removeItem('token')
    await router.push({ name: 'login' })
  }

  private _init() {
    this._state = {
      _id: '',
      name: '',
      password: '',
      mobile: '',
      type: '',
      updated_at: '',
      created_at: '',
      avatar: '',
      token: '',
    }
  }
}

export const userStore = new UserStore()
