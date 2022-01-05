import { UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly, ref, Ref, toRaw, unref } from 'vue'
import axios from '../utils/axios'

export interface Design {
  _id?: string | null
  title: string[]
  code: string
  type: number
  price: object
  creator: string
  owners: string[]
  tags: string[]
  size: string
  owner: string
  status: number
  data: object
  files: string[]
  show: boolean
  updated_at?: string
  created_at?: string
}

interface DesignState {
  page: number
  limit: number
  total: number
}

export default class DesignStore {
  constructor() {
    this._init()
    this._state = reactive(this._state)
    this._rows = ref([])
  }

  private _rows!: Ref<Design[]>

  get rows(): Design[] {
    return this._rows.value
  }

  get page() {
    return this._state.page + 1
  }

  set page(value: number) {
    this._state.page = value - 1
  }

  private _state!: UnwrapNestedRefs<DesignState>

  get state() {
    return readonly(this._state)
  }

  addDesign(design: Design) {
    this._rows.value.push(design)
  }

  async getDesign(page = 0, limit = 10) {
    const { data } = await axios.get('/design')
    this._rows.value = data.data
  }

  async deleteDesign(index: number) {
    const design: Design = this._rows.value[index]
    if (design._id != null) {
      const { data } = await axios.delete(`/design/${design._id}`)
    }
    this._rows.value.splice(index, 1)
    /*else {
      this._rows.value.splice()
    }*/
  }

  async updateDesign(design: Design) {
    const designIndex = this._rows.value.findIndex((item) => item._id == design._id)
    const { data } = await axios.put(`/design/${design._id}`, design)
    if (designIndex > -1) {
      Object.assign(this._rows.value[designIndex], data.data)
    }
  }

  /* async updateDesign(id: string) {
    //debugger
    const designIndex = this._rows.value.findIndex((item) => item._id == id)
    if (designIndex > -1) {
      const { data } = await axios.put(`/design/${id}`, this._rows.value[designIndex])
      Object.assign(this._rows.value[designIndex], data.data)
    }
  }*/

  async uploadDesign() {
    const uploads = this._rows.value.filter((item) => {
      if (item._id == null) {
        return unref(item)
      }
    })
    //debugger
    for (const item of uploads) {
      const body: Design = Object.assign({}, toRaw(item))
      body.status = 8
      const { data } = await axios.post('/design', body)
    }
  }

  private _init() {
    this._state = {
      page: 0,
      total: 0,
      limit: 10,
    }
  }
}

export const designStore = new DesignStore()
