// ReporteStore.js (Pinia)
import { defineStore } from 'pinia'

export const useReporteStore = defineStore('reporte', {
  state: () => ({
    tipo: '',
    idItem: '',
    idReportado: ''
  }),
  persist: true,
  actions: {
    setReporte(tipo, idItem, idReportado) {
      this.tipo = tipo
      this.idItem = idItem
      this.idReportado = idReportado
    }
  }
})
