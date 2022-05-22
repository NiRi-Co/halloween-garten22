<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-10 w-auto" src="@/assets/hg_white.png" alt="hg white" />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <RouterLink ref="routerLink" v-for="item in navigation" :to="item.to"
                class="px-3 py-2 rounded-md text-base font-medium"
                :class="[$route.name === item.rname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']">
                {{ item.name }}</RouterLink>
            </div>
          </div>
        </div>
        <div class="right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 text-white">
          <RouterLink ref="routerLink" to="login" v-if="!auth.isLoggedIn()"
            class="px-3 py-2 rounded-md text-base font-medium"
            :class="[$route.name === 'login' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']">
            Login</RouterLink>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink ref="routerLink" v-for="item in navigation" :to="item.to"
          class="px-3 py-2 rounded-md text-base font-medium"
          :class="[$route.name === item.rname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']">
          {{ item.name }}</RouterLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import { RouterLink, useRoute } from 'vue-router';
import { watch, ref } from "vue"

import { useCommonStore } from "@/stores/common"
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()

const routerLink = ref(null)

const navigation = [
  { name: 'Home', to: '/', rname: "home" },
  { name: 'About', to: '/about', rname: "about" }
]

</script>