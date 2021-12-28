import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly } from 'vue'
import axios from '../utils/axios'

interface User {
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
    console.log('sdfsdfsdf', userStore._state)
  }

  async me() {}

  logout() {
    localStorage.removeItem('token')
  }

  private _init() {
    this._state = {
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
