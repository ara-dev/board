import { UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly, ref, Ref, toRaw } from 'vue'
import { StageModel } from '../core/store/stage'
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
  options: object
  //size: string
  //owner: string
  image?: {
    file_id: string
    file_name: string
    file_storage: string
  }
  status: number
  data: StageModel
  files: string[]
  show: boolean
  updated_at?: string
  created_at?: string
}

interface DesignState {
  page: number
  limit: number
  total: number
  filter: Object
}

export default class DesignStore {
  constructor() {
    this._init()
    this._state = reactive(this._state)
    this._rows = ref([])
    this._uploadList = ref([])
  }

  private _rows!: Ref<Design[]>

  get rows(): Design[] {
    return this._rows.value
  }

  private _uploadList!: Ref<Design[]>

  get uploadList() {
    return this._uploadList.value
  }

  set filter(filter: object) {
    this._state.filter = filter
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
    //this._rows.value.push(design)
    console.log(design)
    this._uploadList.value.push(design)
    //this.page=
    this._state.total=this._uploadList.value.length
  }

  async getDesign() {
    const { data } = await axios.post('/design/table', this._state)
    this._rows.value = data.data.rows
    this._state.total = data.data.total
    this._state.page = data.data.page
    this._state.limit = data.data.limit
  }

  async deleteDesign(id: string) {
    //if (id) {
    const { data } = await axios.delete(`/design/${id}`)
    const index = this._rows.value.findIndex((item) => item._id == id)
    if (index > -1) {
      this._rows.value.splice(index, 1)
    }
    /*else{
      this._uploadList.value.splice(index,1)
    }*/
  }

  removeFromUploadList(index: number) {
    this._uploadList.value.splice(index, 1)
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
    for (const item of this._uploadList.value) {
      const body: Design = Object.assign({}, toRaw(item))
      body.status = 8
      const { data } = await axios.post('/design', body)
    }
    this._uploadList.value = []
  }

  private _init() {
    this._state = {
      page: 0,
      total: 0,
      limit: 10,
      filter: {},
    }
  }
}

export const designStore = new DesignStore()
