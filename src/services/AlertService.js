// src/services/AlertService.js
import { ref } from 'vue'

const show = ref(false)
const titulo = ref('')
const mensaje = ref('')
const tipo = ref('info') // 'info', 'aviso', 'error'
const confirmMode = ref(false)

let resolver = null

function showAlert(newTitulo, newMensaje, newTipo = 'info') {
  titulo.value = newTitulo
  mensaje.value = newMensaje
  tipo.value = newTipo
  confirmMode.value = false
  show.value = true
  return new Promise((resolve) => {
    resolver = resolve
  })
}

function showConfirm(newTitulo, newMensaje) {
  titulo.value = newTitulo
  mensaje.value = newMensaje
  tipo.value = 'info'
  confirmMode.value = true
  show.value = true
  return new Promise((resolve) => {
    resolver = resolve
  })
}

function confirmResponse(value) {
  show.value = false
  if (resolver) {
    resolver(value)
    resolver = null
  }
}

export default {
  show,
  titulo,
  mensaje,
  tipo,
  confirmMode,
  showAlert,
  showConfirm,
  confirmResponse,
}
