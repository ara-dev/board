import { UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly } from 'vue'
import axios from '../utils/axios'

export interface Design {
  _id: string | null
  title: string
  code: string
  type: number
  price: object
  creator: string
  owners: string[]
  tags: string[]
  size: string
  //id: string
  owner: string
  status: number
  data: object
  files: string[]
  updated_at?: string
  created_at?: string
}

export default class DesignStore {
  constructor() {
    this._init()
    this._state = reactive(this._state)
  }

  private _state!: UnwrapNestedRefs<Design[]>

  get state() {
    return readonly(this._state)
  }

  list() {
    return this._state
  }

  addDesign(design: Design) {
    this._state.push(design)
  }

  async getDesign(page = 0, limit = 10) {
    const { data } = await axios.get('/design')
    //console.log('sdfgsdfsdf', data.data)
    this._state = data.data
  }

  async uploadDesign() {
    const uploads = this._state.filter((item) => item._id == null)
    for (const item of uploads) {
      await axios.post('/design', item)
    }
    await this.getDesign()
  }

  private _init() {
    this._state = []
  }
}

export const designStore = new DesignStore()
