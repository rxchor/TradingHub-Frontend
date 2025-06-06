<template>
  <div>
    <Header/>
    <AlertModal/>
    <OfertaModal/>
    <RouterView class="pt-20"/>
  </div>
</template>

<script>
import AlertModal from '@/components/AlertModal.vue'
import Header from '@/components/Header.vue'
import { RouterView } from 'vue-router'
import OfertaModalView from '@/views/OfertaModalView.vue'

export default {
  name: 'App',
  components: {
    OfertaModal: OfertaModalView,
    AlertModal,
    Header,
    RouterView
  }
}
</script>
