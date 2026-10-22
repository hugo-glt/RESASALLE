<script setup lang="ts">
import FeedBox from '../../layouts/FeedBox.vue';
import FilterDropdown from '../../layouts/SortingDropdown.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const filterOpen = ref(false)
const router = useRouter()

function goSearch() {
    router.push('/teachers/search')
}
</script>

<template>
    <div class="flex items-start justify-center gap-10 p-8 min-h-screen">
    <section>
        <div class="flex items-center gap-4">
            <h2 class="text-2xl font-bold mb-4">ADMIN</h2>
            <h2 class="text-2xl font-bold mb-4">DASHBOARD</h2>
            <img src="../../assets/icons/shield-svgrepo-com.svg" class="w-5 h-5 mb-4" />
        </div>
        <!-- Boutons LOGS et ADD -->
        <div class="flex items-center gap-4">
            <button>
                <img src="../../assets/icons/logs-svgrepo-com.svg" class="w-5 h-5" />
                <span class="ml-2">LOGS</span>
            </button>
            <button @click="goSearch">
                <img src="../../assets/icons/plus-large-svgrepo-com.svg" class="w-5 h-5" />
                <span class="ml-2">ADD</span>
            </button>
            <div class="relative">
            <FilterDropdown
                :open="filterOpen"
                @close="filterOpen = false"
                class="relative left-5 mt-2 w-80  max-h-[60vh] overflow-y-auto" />
            </div>
        </div>
    </section>
    <section>
        <FeedBox  @toggle-filter="filterOpen = !filterOpen" />
    </section>
    </div>
</template>

