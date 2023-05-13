import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'

import router from '@/router'
import Icon from '@/directives/icon'

import VeeValidatePlugin from '@/includes/validation'
import i18n from '@/includes/i18n'
import { auth } from '@/includes/firebase'
import GlobalComponents from '@/includes/_globals'
import progressBar from '@/includes/progress-bar'

import App from '@/App.vue'

import '@/assets/base.css'
import '@/assets/main.css'
import 'nprogress/nprogress.css'

registerSW({ immediate: true })

progressBar(router)

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin)
    app.use(i18n)
    app.use(GlobalComponents)

    app.directive('icon', Icon)

    app.mount('#app')
  }
})
