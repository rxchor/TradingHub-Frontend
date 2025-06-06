// src/services/ApiService.js
import axios from 'axios'
import AuthService from './AuthService'
import AlertService from './AlertService'
const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de petición para incluir token
apiClient.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor de respuesta para manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // No hay respuesta del backend (por ejemplo, está caído)
      AlertService.showAlert(
        'Servidor no disponible',
        'No se pudo contactar con el servidor. Por favor, inténtalo más tarde.',
        'error',
      )
    } else {
      const { status } = error.response

      if (status === 503) {
        AlertService.showAlert(
          'Servicio en mantenimiento',
          'El servicio no está disponible temporalmente. Inténtalo más tarde.',
          'error',
        )
      } else if (status >= 500) {
        AlertService.showAlert(
          'Error del servidor',
          'Ha ocurrido un error en el servidor. Estamos trabajando en ello.',
          'error',
        )
      }
    }

    return Promise.reject(error)
  },
)

export default {
  get(resource) {
    return apiClient.get(resource)
  },
  post(resource, data) {
    return apiClient.post(resource, data)
  },
  put(resource, data) {
    return apiClient.put(resource, data)
  },
  delete(resource) {
    return apiClient.delete(resource)
  },
  upload(resource, files) {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append('files', file)
    })

    return apiClient.post(resource, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
