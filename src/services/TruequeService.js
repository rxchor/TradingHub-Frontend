import ApiService from './ApiService'

const url = `/trades`

export default {
  getAll() {
    return ApiService.get(url)
  },
  getById(id) {
    return ApiService.get(`${url}/${id}`)
  },
  getByUsuario(userId) {
    return ApiService.get(`${url}/usuario/${userId}`)
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
  accept(id) {
    return ApiService.put(`${url}/${id}/aceptar`)
  },
  reject(id) {
    return ApiService.put(`${url}/${id}/rechazar`)
  },
}
