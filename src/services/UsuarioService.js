import ApiService from './ApiService'

const url = `/usuarios`

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
  cambiarPassword(user, currentPassword, newPassword) {
    return ApiService.put(`${url}/${user}/cambiar-password`, {
      id: user,
      passwordActual: currentPassword,
      nuevaPassword: newPassword,
    })
  },
  deletePenalizacion(id) {
    return ApiService.delete(`${url}/penalizar/${id}`)
  }
}
