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

function changeDay(offset: number) {
    const d = new Date(currentDate.value)
    d.setDate(d.getDate() + offset)
    currentDate.value = d
}
</script>

<template>
    <section class="w-125 h-125 bg-gray-300 relative p-6">
    <div class="flex items-center justify-between">
        <!-- Flèches à gauche -->
        <div class="flex items-center gap-4">
            <!-- Jour précédent -->
                <button @click="changeDay(-1)" class="cursor-pointer" aria-label="Jour précédent">
                    <img src="../assets/icons/arrow-left-svgrepo-com.svg" class="w-5 h-5" />
                </button>

                <span class="font-semibold capitalize">{{ formattedDate }}</span>

                <!-- Jour suivant -->
                <button @click="changeDay(1)" class="cursor-pointer" aria-label="Jour suivant">
                    <img src="../assets/icons/arrow-right-svgrepo-com.svg" class="w-5 h-5" />
                </button>
        </div>

        <!-- Funnel à droite -->
        <button @click="emit('toggle-filter')" class="cursor-pointer">
            <img src="../assets/icons/funnel-sort-svgrepo-com.svg" class="w-5 h-5" />
        </button>
    </div>
    <div class="h-1 bg-gray-600 mt-4 w-full"></div>
</section>
</template>