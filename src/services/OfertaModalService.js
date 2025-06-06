// src/services/OfertaModalService.js
import { ref } from 'vue'
import ProductosService from '@/services/ProductosService.js'
import AuthService from '@/services/AuthService.js'
import UsuarioService from '@/services/UsuarioService.js'

const show = ref(false)
const id_interesado = ref('')
const usuario_vendedor = ref({})

const inventario_interesado = ref([])
const inventario_vendedor = ref([])

const yourOffer = ref([])
const theirOffer = ref([])

async function showModal(producto) {
  id_interesado.value = AuthService.getUserIdFromToken()

  let userResponse = await UsuarioService.getById(producto.idVendedor)
  let invInteresadoResponse = await ProductosService.getAllByIdVendedor(id_interesado.value)
  let invVendedorResponse = await ProductosService.getAllByIdVendedor(producto.idVendedor)

  theirOffer.value.push(producto)

  usuario_vendedor.value = userResponse.data
  console.log('usuario vendedor', usuario_vendedor.value)

  inventario_interesado.value = invInteresadoResponse.data
  console.log('Inventario interesado: ', inventario_interesado.value)

  inventario_vendedor.value = invVendedorResponse.data
  console.log('Inventario vendedor: ', inventario_vendedor.value)

  show.value = true
}

function closeModal() {
  show.value = false

  // Limpiar variables
  inventario_interesado.value = []
  inventario_vendedor.value = []
  usuario_vendedor.value = {}
  yourOffer.value = []
  theirOffer.value = []
  id_interesado.value = ''
}

export default {
  show,
  id_interesado,
  usuario_vendedor,
  inventario_interesado,
  inventario_vendedor,
  yourOffer,
  theirOffer,
  showModal,
  closeModal
}
