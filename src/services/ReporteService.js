import ApiService from './ApiService'

const url = `/reportes`

export default {
  getAll() {
    return ApiService.get(url)
  },
  getById(id) {
    return ApiService.get(`${url}/${id}`)
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
