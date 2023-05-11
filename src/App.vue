<template>
  <!-- Header -->
  <app-header></app-header>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <!-- Player -->
  <player></player>

  <!-- Auth Modal -->
  <auth></auth>
</template>

<script>
import { mapWritableState } from 'pinia'
import { auth } from './includes/firebase'

import useUserStore from '@/stores/user.js'

import AppHeader from './components/AppHeader.vue'
import Auth from './components/Auth.vue'
import Player from './components/Player.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    Auth,
    Player
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
  opacity: 0;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
