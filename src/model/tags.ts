import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly } from 'vue'
import axios from '../utils/axios'

interface Tag {
  _id: string
  title: string
  aliases: string[]
  color: string
  count: number
  parent: string
  icon: string
  deleted_at: string
}

export default class TagsStore {
  constructor() {
    this._init()
    this._state = reactive(this._state)
  }

  private _state!: UnwrapNestedRefs<Tag[]>

  get state(): DeepReadonly<Tag[]> {
    return readonly(this._state)
  }

  list(): Tag[] {
    return this._state
  }

  async getTag(page = 0, limit = 20) {
    const { data } = await axios.get('tag')
    this._state = data.data as Tag[]
  }

  /*async getTagsByID(ids: string[]): Promise<Tag[]> {
    const notfound: string[] = []
    const result: Tag[] = []
    debugger
    ids.forEach((id) => {
      const tag = this._state.find((_tag) => _tag._id == id)
      if (tag) result.push(tag)
      else notfound.push(id)
    })

    if (notfound.length > 0) {
      const { data } = await axios.post('tag', notfound)
      this._state.push(...data.data)
      result.push(...data.data)
    }
    return result
  }*/

  private _init() {
    this._state = []
  }
}

export const tagsStore = new TagsStore()
