<template>
    <main class="container mx-auto flex h-screen">
        <div class="bg-gray-700 text-white m-auto py-24 px-24 rounded shadow-2xl">
            <h2 class="text-4xl mb-6">Login</h2>
            <div v-if="!auth.isLoggedIn()">
                <form class="m-auto text" action="">
                    <div>
                        <label for="username">Username:</label>
                        <input id="username" v-model="username" class="ml-4 p-1 border-solid rounded text-black shadow-md"
                            type="text">
                    </div>
                    <div class="mt-4">
                        <label for="password">Password:</label>
                        <input id="password" v-model="password" class="ml-4 p-1 border-solid rounded text-black shadow-md"
                            type="password">
                    </div>
                </form>
                <button class="mt-6 py-3 px-5 bg-gray-500 hover:bg-gray-600 rounded duration-200 shadow-md"
                    @click="login()">Login</button>
                <div v-if="auth_msg && auth_msg != true" class="bg-red-500 mt-4 p-3 rounded max-w-max">{{ auth_msg }}</div>
            </div>
            <div v-else-if="auth_msg === true" class="p-5 bg-green-600 rounded">
                Logged in
            </div>
        </div>

    </main>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios, { type AxiosRequestConfig } from "axios"

import { useCommonStore } from '@/stores/common';
import { useAuthStore } from '@/stores/auth';
const commonStore = useCommonStore()
const auth = useAuthStore()

const auth_msg = ref();

const password = ref();
const username = ref();


const login = async () => {
    const options: AxiosRequestConfig = {
        url: `${commonStore.apiUrl}/auth/login`,
        method: "POST",
        data: {
            username: username.value,
            password: password.value
        }
    }
    const res = await axios(options).catch((err) => {
        auth_msg.value = "API reqest error"
    })

    if (res?.status == 200) {
        auth.login(res.data.token, res.data.expiresIn)
        auth_msg.value = true
    } else if (res?.status == 401) {
        auth_msg.value = "Wrong username/password"
    }
}

</script>

<style>
</style>