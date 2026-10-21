<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{
    (e: 'close'): void
    (e: 'apply', filters: { building: string; capacity: string; equipment: string; modular: boolean; date: Date | null }): void
}>()

const building = ref('')
const capacity = ref('')
const equipment = ref('')
const modularEnabled = ref(false)
const selectedDate = ref<Date | null>(null)
</script>

<template>
    <div v-if="open" class="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
    <button @click="emit('close')">
                        <img src="../assets/icons/no-svgrepo-com.svg" class="w-4 h-4 cursor-pointer" />
                    </button>
                    <!-- 3 Radio groups -->
                    <div class="mb-4">
                        <p class="font-semibold mb-2">Building</p>
                        <div class="flex gap-4">
                            <label><input type="radio" v-model="building" value="Alpha" />Alpha</label>
                            <label><input type="radio" v-model="building" value="Beta" />Beta</label>
                            <label><input type="radio" v-model="building" value="Gamma" />Gamma</label>
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
</template>