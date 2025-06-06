<template>
  <div class="flex flex-col h-full">
    <div ref="messageContainer" class="flex-1 overflow-y-auto p-4 space-y-2 bg-midnight-800">


      <div
        v-for="(msg, index) in messages"
        class="flex"
        :key="index"
        :class="msg.me ? 'justify-end' : 'justify-start'"
      >
        <div
          :class="[
            'p-3 rounded-xl max-w-xs relative',
            msg.me ? 'bg-midnight-900 text-midnight-50 font-semibold self-end' : 'bg-crimson-600 font-semibold text-white'
          ]"
        >
          <div :class="msg.me ? 'text-left' : 'text-left'" >{{ msg.text }}</div>
          <div :class="msg.me ? 'text-right ' : 'text-left'" class="text-xs opacity-60 bottom-1 right-2">
            {{  formatDate(msg.timestamp) }}
          </div>
        </div>
      </div>


    </div>

    <form @submit.prevent="sendMessage" class="p-4 border-t border-midnight-700 flex gap-2 bg-midnight-900">
      <input
        v-model="messageContent"
        type="text"
        placeholder="Escribe un mensaje..."
        class="flex-1 px-4 py-2 rounded-full bg-midnight-800 text-midnight-50 placeholder-midnight-400 focus:outline-none"
      />
      <button
        type="submit"
        class="bg-crimson-500 text-white px-4 py-2 rounded-full hover:bg-crimson-600 transition"
      >
        Enviar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Client } from '@stomp/stompjs'
import AuthService from '@/services/AuthService.js'
import ChatService from '@/services/ChatService.js'

const props = defineProps({
  selectedTrueque: {
    type: Object,
    required: true
  }
})

const messages = ref([])
const messageContent = ref('')
let stompClient = null
let subscription = null
const messageContainer = ref(null)

const subscribeToTrueque = (idTrueque) => {
  if (subscription) subscription.unsubscribe()

  loadInitialMessages()

  subscription = stompClient.subscribe(`/topic/trueque/${idTrueque}`, (message) => {
    const body = JSON.parse(message.body)
    if (!body.content) return // ignorar vacíos

    messages.value.push({
      text: body.content,
      me: body.idSender === AuthService.getUserIdFromToken(),
      timestamp: body.timestamp
    })
    scrollToBottom()
  })
}

onMounted(() => {
  // para la primera vez, ya que el watch no funcionaria
  connect()
})

onUnmounted(() => {
  if (subscription) subscription.unsubscribe()
  if (stompClient) stompClient.deactivate()
})


// Detectar cambio de trueque
watch(() => props.selectedTrueque, (nuevo, anterior) => {
  if (!nuevo || !nuevo.id || nuevo.id === anterior?.id) return

  messages.value = [] // limpiar mensajes

  if (stompClient?.connected) {
    subscribeToTrueque(nuevo.id)
  } else {
    connect()
  }
})

const connect = () => {
  if (!stompClient) {
    stompClient = new Client({
      brokerURL: 'ws://localhost:8081/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Conectado al WebSocket')
        if (props.selectedTrueque?.id) {
          subscribeToTrueque(props.selectedTrueque.id)
        }
      }
    })
    stompClient.activate()
  }
}

const loadInitialMessages = async () => {
  try {
    const response = await ChatService.getByTruequeId(props.selectedTrueque.id)
    console.log('Mensajes recibidos:', response.data)

    messages.value = Array.isArray(response.data) ? response.data.map(msg => ({
      text: msg.content,
      me: msg.idSender === AuthService.getUserIdFromToken(),
      timestamp: msg.timestamp
    })) : []

    scrollToBottom()
  } catch (err) {
    console.error('Error al cargar mensajes iniciales:', err)
  }
}

const sendMessage = () => {
  if (!messageContent.value.trim()) return

  const msg = {
    idSender: AuthService.getUserIdFromToken(),
    content: messageContent.value,
    idTrueque: props.selectedTrueque.id,
    timestamp: new Date()
  }

  stompClient.publish({
    destination: `/app/trueque/${props.selectedTrueque.id}`,
    body: JSON.stringify(msg)
  })

  // NO push local aquí — el mensaje llegará por WebSocket
  messageContent.value = ''
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const day = date.toLocaleDateString()
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return `${day} ${time}`
}


const scrollToBottom = () => {
  setTimeout(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  }, 50)
}

</script>
