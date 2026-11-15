<script setup lang="ts">
import type { Room } from '../api/rooms'

defineProps<{ room: Room }>()
const emit = defineEmits<{ (e: 'select', room: Room): void }>()
const floorLabel = (floor: Room['floors']) => String(floor ?? '')
</script>

<template>
    <button type="button" @click="emit('select', room)"
        class="text-left bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer">
        <div class="flex justify-between items-start">
            <h3 class="text-lg font-bold">Salle {{ room.numbers }}</h3>
            <span v-if="room.modularities" class="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                Modulable
            </span>
        </div>
        <p class="text-sm text-gray-600">{{ room.buildings }} · {{ floorLabel(room.floors) }}</p>
        <p class="mt-1">{{ room.capacities }} places</p>
        <ul v-if="room.equipements.length" class="flex flex-wrap gap-1 mt-2">
            <li v-for="e in room.equipements" :key="e.idEquipements" class="text-xs bg-gray-100 rounded px-2 py-0.5">
                {{ e.description }}
            </li>
        </ul>
        <p v-else class="text-xs text-gray-400 mt-2">Aucun équipement</p>
    </button>
</template>