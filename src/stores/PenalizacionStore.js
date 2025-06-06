// ProductoStore.js (Pinia)
import { defineStore } from 'pinia'

export const usePenalizacionStore = defineStore('penalizacion', {
  state: () => ({
    penalizacion: undefined
  }),
  persist: true,
  actions: {
    setPenalizacion(penalizacion) {
      this.penalizacion = penalizacion
    },
    clearPenalizacion() {
      this.penalizacion = undefined
    }
  }
})
