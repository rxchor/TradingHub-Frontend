import ApiService from './ApiService'

const url = `/chat`

export default {
  getAll() {
    return ApiService.get(url)
  },
  getById(id) {
    return ApiService.get(`${url}/${id}`)
  },
  getByTruequeId(id) {
    console.log(`${url}/trueque/${id}`)
    return ApiService.get(`${url}/trueque/${id}`)
  },
  save(data) {
    return ApiService.post(url, data)
  },
  update(id, data) {
    return ApiService.put(`${url}/${id}`, data)
  },
  delete(id) {
    return ApiService.delete(`${url}/${id}`)
  },

}
