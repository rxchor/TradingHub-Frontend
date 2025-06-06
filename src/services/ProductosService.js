import ApiService from './ApiService'

const url = `/productos`

export default {
  getAll() {
    return ApiService.get(url)
  },
  getDisponibles() {
    return ApiService.get(`${url}/disponibles`)
  },
  getById(id) {
    return ApiService.get(`${url}/${id}`)
  },
  getAllByIdVendedor(idVendedor) {
    return ApiService.get(`${url}/vendedor/${idVendedor}`)
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
  changeDisponible(id, disponible) {
    return ApiService.put(`${url}/disponibilidad/${id}`, disponible)
  }
}
