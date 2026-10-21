<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggle-filter'): void }>()
</script>

<template>
    <section class="w-125 h-125 bg-gray-300 relative">
        <div class="flex justify-center gap-20 mt-2">
            <img src="../assets/icons/arrow-left-svgrepo-com.svg" class="w-5 h-5" />
            <img src="../assets/icons/arrow-right-svgrepo-com.svg" class="w-5 h-5" />
            <button @click="emit('toggle-filter')" class="cursor-pointer">
                <img src="../assets/icons/funnel-sort-svgrepo-com.svg" class="w-5 h-5" />
            </button>
        </div>
    <!-- ... -->
    </section>
</template>