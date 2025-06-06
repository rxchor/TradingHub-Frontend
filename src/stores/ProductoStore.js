// ProductoStore.js (Pinia)
import { defineStore } from 'pinia'

export const useProductoStore = defineStore('producto', {
  state: () => ({
    id: ''
  }),
  persist: true,
  actions: {
    setProducto(id) {
      this.id = id
    }
  }
})
