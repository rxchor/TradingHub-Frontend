import ApiService from './ApiService'
const url = '/categorias'

export default {
  getAll() {
    return ApiService.get(url)
  },
  getById(id) {
    return ApiService.get(`${url}/${id}`)
  },
  findByNombre(nombreCategoria) {
    return ApiService.get(`${url}/nombre/${nombreCategoria}`)
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
