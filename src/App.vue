<template>
  <!-- Header -->
  <app-header></app-header>

  <router-view></router-view>

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
