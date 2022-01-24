import axios from '@b/utils/axios'

export async function getDesignFromId(id) {
  const { data } = await axios.get('design/' + id)
  return data
}
