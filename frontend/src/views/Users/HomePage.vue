<script setup lang="ts">
import { useRouter } from 'vue-router';
import SortingDropdown from '../../layouts/SortingDropdown.vue';
import FeedBox from '../../layouts/FeedBox.vue';
import { ref } from 'vue';

const router = useRouter()


const filterOpen = ref(false)
function goSearch() {
    router.push('/teachers/search')
}

</script>

<template>
    <div class="flex items-start justify-center gap-50 p-8 min-h-screen">
        <!-- Colonne de gauche -->
        <section class="flex flex-col left-5 w-80 min-h-100">
            <div>
            <!-- Wrapper relative pour le dropdown -->
                <div class="relative">
                    <h2 class="text-5xl font-extrabold text-left leading-tight">BOOKED<br />ROOMS</h2>
                </div>
                <div>
                    <button @click="goSearch" class="flex flex-col items-center cursor-pointer mt-auto">
                        <img src="../../assets/icons/plus-large-svgrepo-com.svg" class="w-5 h-5" />
                        <span class="text-xs">BOOK A ROOM</span>
                    </button>
                </div>
            </div>
            <div>
                <SortingDropdown :open="filterOpen" @close="filterOpen = false"
                    class="relative left-5 mt-2 w-80  max-h-[60vh] overflow-y-auto" />
            </div>
        </section>

        <!-- FeedBox à droite -->
        <FeedBox @toggle-filter="filterOpen = !filterOpen" />
    </div>
</template>