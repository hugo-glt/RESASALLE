<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const dropdownOpen = ref(false)
const roomType = ref('')
const capacity = ref('')
const equipment = ref('')
const modularEnabled = ref(false)
const selectedDate = ref<Date | null>(null)

function toggleDropdown() { dropdownOpen.value = !dropdownOpen.value }
function closeDropdown() { dropdownOpen.value = false }
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
                <div v-if="dropdownOpen"
                    class="relative w-full max-w-md mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <!-- Close button -->
                    <button @click="closeDropdown" class="absolute top-2 right-2 cursor-pointer">
                        <img src="../../assets/icons/no-svgrepo-com.svg" class="w-4 h-4" />
                    </button>
                    <!-- 3 Radio groups -->
                    <div class="mb-4">
                        <p class="font-semibold mb-2">Building</p>
                        <div class="flex gap-4">
                            <label><input type="radio" v-model="roomType" value="Alpha" />Alpha</label>
                            <label><input type="radio" v-model="roomType" value="Beta" />Beta</label>
                            <label><input type="radio" v-model="roomType" value="Gamma" />Gamma</label>
                        </div>
                    </div>
                    <div class="mb-4">
                        <p class="font-semibold mb-2">Capacity</p>
                        <div class="flex gap-4">
                            <label><input type="radio" v-model="capacity" value="small" />30</label>
                            <label><input type="radio" v-model="capacity" value="medium" />50</label>
                            <label><input type="radio" v-model="capacity" value="large" />150</label>
                        </div>
                    </div>
                    <div class="mb-4">
                        <p class="font-semibold mb-2">Equipement</p>
                        <div class=" flex justify-center gap-4">
                            <label><input type="radio" v-model="equipment" value="sboard" />Screen Board</label>
                            <label><input type="radio" v-model="equipment" value="computer" />Computer</label>
                            <label><input type="radio" v-model="equipment" value="srack" />Server Rack</label>
                        </div>
                    </div>
                    <!-- Toggle Modular -->
                    <div class="mb-4 text-center">
                        <p class="font-semibold mb-2">Modular</p>
                        <button @click="modularEnabled = !modularEnabled"
                            :class="modularEnabled ? 'bg-blue-600' : 'bg-gray-300'"
                            class="w-12 h-6 rounded-full relative transition cursor-pointer">
                            <span :class="modularEnabled ? 'translate-x-6' : 'translate-x-1'"
                                class="absolute top-1 w-4 h-4 bg-white rounded-full transition" />
                        </button>
                    </div>
                    <!-- Calendar -->
                    <div>
                        <p class="font-semibold mb-2">Date</p>
                        <v-calendar v-model="selectedDate" />
                    </div>
                </div>
            </section>
        </div>
        <section class="w-125 h-125 bg-gray-300 relative">
            <div class="flex justify-center gap-20 mt-2">
                <img src="../../assets/icons/arrow-left-svgrepo-com.svg" class="w-5 h-5">
                <img src="../../assets/icons/arrow-right-svgrepo-com.svg" class="w-5 h-5">
                <div @click="toggleDropdown" class="flex flex-col items-start">
                    <img src="../../assets/icons/funnel-sort-svgrepo-com.svg" class="w-5 h-5 right-5" />
                </div>
            </div>
            <div class="flex justify-center">
                <div class="w-110 h-1 bg-gray-500"></div>
            </div>
        </section>
    </div>
</template>