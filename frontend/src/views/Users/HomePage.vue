<script setup lang="ts">
import { useRouter } from 'vue-router';
import FilterDropdown from '../../layouts/SortingDropdown.vue';
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
                <div class="relative">
                    <FilterDropdown :open="filterOpen" @close="filterOpen = false" class="absolute top-12 left-0 z-3" />
                </div>
            </section>
        </div>
        <div>
            <FeedBox @toggle-filter="filterOpen = !filterOpen" />
        </div>
    </div>
</template>