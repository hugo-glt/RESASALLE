<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import FeedBox from '../../../layouts/FeedBox.vue';
import FilterDropdown from '../../../layouts/SortingDropdown.vue';

const router = useRouter()
const filterOpen = ref(false)

function cancelSearch() {
    router.push('/')
}

</script>

<template>
    <div class="flex items-start justify-center gap-50 p-8 min-h-screen">
        <div class="flex items-start justify-center p-8 min-h-screen">
            <section class="flex flex-col items-center min-h-100">
                <div class="flex items-center gap-4">
                    <h2 class="text-2xl font-bold mb-4">ROOM</h2>
                    <h2 class="text-2xl font-bold mb-4">BOOKER</h2>
                </div>
                <div class="relative">
                    <FilterDropdown
                        :open="filterOpen"
                        @close="filterOpen = false"
                        class="relative left-5 mt-2 w-80  max-h-[60vh] overflow-y-auto"/>
                </div>
            </section>
        </div>
        <section>
            <div>
                <FeedBox @toggle-filter="filterOpen = !filterOpen"/>
            </div>
            <div>
                <button @click="cancelSearch">
                    <span>CANCEL</span>
                </button>
            </div>
        </section>
    </div>
</template>