<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

function goSearch() {
    router.push('/teachers/search')
}

</script>

<template>
    <div class="flex items-start justify-center gap-50 p-8 min-h-screen">
        <div class="flex items-start justify-center p-8 min-h-screen">
            <section class="flex flex-col items-center min-h-100">
                <div class="flex items-center gap-4">
                    <h2 class="text-2xl font-bold mb-4">BOOKED</h2>
                    <h2 class="text-2xl font-bold mb-4">ROOMS</h2>
                </div>
                <div>
                <button @click="goSearch" class="flex flex-col items-center cursor-pointer mt-auto">
                    <img src="../../assets/icons/plus-large-svgrepo-com.svg" class="w-10 h-10" />
                    <span>BOOK A ROOM</span>
                </button>
                </div>
            </section>
        </div>
        <section class="w-125 h-125 bg-gray-300 relative">
            <div class="flex justify-center gap-20 mt-2">
                <img src="../../assets/icons/arrow-left-svgrepo-com.svg"  class="w-5 h-5">
                <img src="../../assets/icons/arrow-right-svgrepo-com.svg" class="w-5 h-5">
                <div class="flex flex-col items-start">
                    <img src="../../assets/icons/funnel-sort-svgrepo-com.svg" class="w-5 h-5 right-5" />
                </div>
            </div>
            <div class="flex justify-center" >
                <div class="w-110 h-1 bg-gray-500"></div>
            </div>
        </section>
    </div>
</template>