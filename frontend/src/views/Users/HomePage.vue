<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

function goSearch() {
    router.push('/teachers/search')
}

</script>

<template>
    <div class="flex items-start justify-center gap-10 p-8 min-h-screen">
    <section>
        <div class="flex items-center gap-4">
            <h2 class="text-2xl font-bold mb-4">BOOKED</h2>
            <h2 class="text-2xl font-bold mb-4">ROOMS</h2>
        </div>
        <!-- Boutons ADD -->
        <div class="flex items-center gap-4 cursor-pointer">
            <button @click="goSearch" >
                <img src="../../assets/icons/plus-large-svgrepo-com.svg" class="w-10 h-10" />
                <span class="ml-2">BOOK A ROOM</span>
            </button>
        </div>
    </section>
    <section>
        <div class="w-75 h-100 bg-gray-300 relative">
            <img src="../../assets/icons/funnel-sort-svgrepo-com.svg" class="w-5 h-5" />
            <div class="w-60 h-1 bg-gray-500"></div>
        </div>
    </section>
    </div>
</template>