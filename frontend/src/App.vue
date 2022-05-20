<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "@/components/Navbar.vue"

import { useCommonStore } from "@/stores/common"

const apiUrl = useCommonStore().apiUrl
</script>

<template>
  <Navbar></Navbar>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <h1>API URL: {{ apiUrl }}</h1>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';
</style>
