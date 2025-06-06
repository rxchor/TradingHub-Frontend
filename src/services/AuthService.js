// src/services/AuthService.js
import ApiService from './ApiService'
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { usePenalizacionStore } from '@/stores/PenalizacionStore.js'

const url = '/auth'
const isLoggedIn = ref(!!localStorage.getItem('token')) // valor inicial

export default {
  isLoggedIn,

  register(data) {
    return ApiService.post(`${url}/register`, data).then((response) => {
      const token = response.data.token
      localStorage.setItem('token', token)
      isLoggedIn.value = true
      return response
    })
  },

  login(data) {
    return ApiService.post(`${url}/login`, data).then((response) => {
      const token = response.data.token
      localStorage.setItem('token', token)
      isLoggedIn.value = true
      return response
    })
  },

  logout() {
    localStorage.removeItem('token')
    isLoggedIn.value = false
    const penalizacionStore = usePenalizacionStore()
    penalizacionStore.clearPenalizacion()
  },

  getToken() {
    const token = localStorage.getItem('token')
    if (!token) {
      isLoggedIn.value = false
    }
    return token
  },

  getUserIdFromToken() {
    const token = localStorage.getItem('token')
    if (token) {
      return jwtDecode(this.getToken()).sub
    }
    return null
  },
}
