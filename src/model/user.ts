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
  roles: string[]
  updated_at: string
  created_at: string
  avatar: string
  token: string
}

export default class UserStore {
  private readonly _roleMap

  constructor() {
    this._init()
    this._state = reactive(this._state)
    this._roleMap = new Map()
    this._roleMap.set('superAdmin', 'مدیر کل  ')
    this._roleMap.set('admin', 'مدیر')
    this._roleMap.set('designer', 'طراح')
  }

  /*get roleMap() {
    return this._roleMap
  }*/

  private _state!: UnwrapNestedRefs<User>

  get state(): DeepReadonly<User> {
    return readonly(this._state)
  }

  getRoleStr(role: string) {
    return this._roleMap.get(role)
  }

  isSuperAdmin(): boolean {
    return this._state.roles.includes('superAdmin')
  }

  async login(mobile: string, password: string) {
    const { data } = await axios.post('auth/login', {
      mobile,
      password,
    })
    localStorage.setItem('token', data.token)
    Object.assign(userStore._state, data)
    //console.log('login data', userStore._state)
  }

  isAdmin(): boolean {
    return this._state.roles.includes('admin')
  }

  isDesigner(): boolean {
    return this._state.roles.includes('designer')
  }

  async getUserInfo() {
    const token = localStorage.getItem('token')
    if (token) {
      const { data } = await axios.get('auth/me')
      Object.assign(userStore._state, data.data)
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
      roles: [],
      updated_at: '',
      created_at: '',
      avatar: '',
      token: '',
    }
  }
}

export const userStore = new UserStore()
