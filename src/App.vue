<template>
  <!-- Header -->
  <app-header></app-header>

  <!-- Introduction -->
  <introduction></introduction>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import Introduction from './components/Introduction.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    Introduction
  }
}
</script>

<style lang="scss" scoped></style>
