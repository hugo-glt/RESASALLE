<script setup lang="ts">
import { ref, computed } from 'vue'
const emit = defineEmits<{ (e: 'toggle-filter'): void }>()

const currentDate = ref(new Date())

const formattedDate = computed(() =>
    currentDate.value.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
)
</script>

<template>
    <section class="w-125 h-125 bg-gray-300 relative p-6">
    <div class="flex items-center justify-between">
        <!-- Flèches à gauche -->
        <div class="flex items-center gap-4">
            <img src="../assets/icons/arrow-left-svgrepo-com.svg" class="w-5 h-5" />
            <span class="font-semibold capitalize">{{ formattedDate }}</span>
            <img src="../assets/icons/arrow-right-svgrepo-com.svg" class="w-5 h-5" />
        </div>

        <!-- Funnel à droite -->
        <button @click="emit('toggle-filter')" class="cursor-pointer">
            <img src="../assets/icons/funnel-sort-svgrepo-com.svg" class="w-5 h-5" />
        </button>
    </div>
    <div class="h-1 bg-gray-600 mt-4 w-full"></div>
</section>
</template>