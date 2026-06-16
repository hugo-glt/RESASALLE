<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '../composables/useUserStore';
import { ref } from 'vue';

const { selectedUser } = useUserStore();
const router = useRouter()
const dropdownOpen = ref(false)

function toggleDropdown() { dropdownOpen.value = !dropdownOpen.value }
function goLogout() {
    dropdownOpen.value = false
    selectedUser.value = null
    router.push('/login')
}
function goDashboard() {
    dropdownOpen.value = false
    router.push('/dashboard')
}
</script>

<template>
    <nav class="flex items-center justify-between gap-5 px-6 py-3 bg-white">

        <!-- Left: Logo + Separator -->
        <div class="flex items-center gap-4">
            <h1 class="font-italic text-[#00334E]">RESASALLE</h1>
            <div class="w-5 h-10 bg-gray-300"></div>
        </div>

        <!-- Center: user name + status -->
        <div class="flex flex-col items-center">
            <span class="font-bold">PlaceHolder</span>
            <span class="text-sm text-gray-500">{{selectedUser}}</span>
        </div>

        <div class="relative">
        <img @click="toggleDropdown" src="../assets/icons/user-3-svgrepo-com.svg" class="w-15 h-15 rounded-full cursor-pointer" />

        <!-- Overlay pour fermer en cliquant à l'extérieur -->
        <div v-if="dropdownOpen" @click="dropdownOpen = false" class="fixed inset-0 z-10"></div>

        <!-- Menu dropdown -->
        <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <button @click="goDashboard" class="w-full text-left px-4 py-2 hover:bg-gray-100">Admin Dashboard</button>
            <button @click="goLogout" class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Log out</button>
            </div>
        </div>
    </nav>
</template>