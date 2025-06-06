import ApiService from './ApiService'

const url = `/images`

export default {
  getByName(name) {
    return ApiService.get(`${url}/${name}`)
  },
  uploadMany(data) {
    return ApiService.upload(`${url}/batch`, data)
  },
  upload(data) {
    return ApiService.upload(url, data)
  },
  delete(id) {
    return ApiService.delete(`${url}/${id}`)
  },
}
