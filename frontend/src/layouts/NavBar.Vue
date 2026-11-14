<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../composables/useUserStore'

const router = useRouter()
const { user, role, logout } = useUserStore()

const dropdownOpen = ref(false)
const loggingOut = ref(false)

function toggleDropdown() { dropdownOpen.value = !dropdownOpen.value }

async function goLogout() {
    loggingOut.value = true
    dropdownOpen.value = false
    try {
        await logout()
    } catch (e) {
        console.error('LOGOUT ERROR:', e) 
    } finally {
        loggingOut.value = false
        await router.replace('/login') 
    }
}

function goDashboard() {
    dropdownOpen.value = false
    router.push('/dashboard')
}

function goHomePage() {
    router.push('/')
}
</script>

<template>
    <nav class="flex items-center justify-between gap-5 px-6 py-3 bg-white">

        <!-- Left: Logo + Separator -->
        <div class="flex items-center gap-4">
            <h1 @click="goHomePage" class="italic text-[#00334E] cursor-pointer">RESASALLE</h1>
            <div class="w-5 h-10 bg-gray-300"></div>
        </div>

        <!-- Center: prénom + rôle -->
        <div class="flex flex-col items-center">
            <span class="font-bold">{{ user?.firstname }}</span>
            <span class="text-sm text-gray-500">{{ role }}</span>
        </div>

        <div class="relative">
            <button type="button" @click="toggleDropdown" aria-label="Menu utilisateur">
                <img src="../assets/icons/user-3-svgrepo-com.svg"
                    class="w-15 h-15 rounded-full cursor-pointer" />
            </button>

            <!-- Overlay pour fermer en cliquant à l'extérieur -->
            <div v-if="dropdownOpen" @click="dropdownOpen = false" class="fixed inset-0 z-10"></div>

            <!-- Menu dropdown -->
            <div v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <button v-if="role === 'Admin'" @click="goDashboard"
                    class="w-full text-left px-4 py-2 hover:bg-gray-100">Admin Dashboard</button>
                <button @click="goLogout" :disabled="loggingOut"
                    class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 disabled:opacity-50">Log-out
                </button>
            </div>
        </div>
    </nav>
</template>