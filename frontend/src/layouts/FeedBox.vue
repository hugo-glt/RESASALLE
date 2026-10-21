<script setup lang="ts">
    import { ref } from 'vue';

const dropdownOpen = ref(false)

function toggleDropdown() { dropdownOpen.value = !dropdownOpen.value }

</script>

<template>
    <section class="w-125 h-125 bg-gray-300 relative">
            <div class="flex justify-center gap-20 mt-2">
                <img src="../assets/icons/arrow-left-svgrepo-com.svg" class="w-5 h-5">
                <img src="../assets/icons/arrow-right-svgrepo-com.svg" class="w-5 h-5">
                <div @click="toggleDropdown" class="flex flex-col items-start">
                    <img src="../assets/icons/funnel-sort-svgrepo-com.svg" class="w-5 h-5 right-5" />
                </div>
            </div>
            <div class="flex justify-center">
                <div class="w-110 h-1 bg-gray-500"></div>
            </div>
        </section>
</template>