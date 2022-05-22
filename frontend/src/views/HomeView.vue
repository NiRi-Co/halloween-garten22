<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useCommonStore } from '@/stores/common';
import axios, { type AxiosRequestConfig } from 'axios';
import { onMounted, ref } from 'vue';
const auth = useAuthStore();
const apiUrl = useCommonStore().apiUrl;

const user = ref()


onMounted(async () => {
  if (auth.isLoggedIn()) {

    const options: AxiosRequestConfig = {
      url: `${apiUrl}/auth/protected`,
      headers: {
        "Authorization": auth.token!!
      }
    }
    const res = await axios(options)
    user.value = res?.data.user
  }
})


</script>

<template>
  <main class="container mx-auto mt-3">
    <h2 class="text-3xl" v-if="user">Welcome, {{ user.username }}</h2>
    <h2 class="text-3xl" v-else-if="auth.isLoggedIn()">Fetching</h2>
    <h2 class="text-3xl" v-else>Not logged in</h2>
  </main>
</template>
