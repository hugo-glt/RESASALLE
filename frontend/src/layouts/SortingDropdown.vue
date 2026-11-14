<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFilters } from '../api/rooms'
import type { FilterOptions, RoomFilters } from '../api/rooms'

function floorLabel(floor: number): string {
    return floor === 0 ? 'Rez-de-chaussée' : `${floor}e étage`
}

defineProps<{ open: boolean }>()
const emit = defineEmits<{
    (e: 'close'): void
    (e: 'apply', filters: RoomFilters): void
}>()

const options = ref<FilterOptions | null>(null)
const optionsError = ref('')

const buildings = ref<string[]>([])
const floors = ref<number[]>([])
const capacityMin = ref<number | null>(null)
const equipements = ref<number[]>([])
const modularEnabled = ref(false)
const selectedDate = ref<Date | null>(null)
const timeStart = ref('')
const timeEnd = ref('')
const formError = ref('')

const today = new Date()

function toLocalISODate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

async function loadOptions() {
    optionsError.value = ''
    try {
    options.value = await getFilters()
    } catch {
    optionsError.value = 'Impossible de charger les filtres'
    }
}
onMounted(loadOptions)

function apply() {
    formError.value = ''
    if (!selectedDate.value || !timeStart.value || !timeEnd.value) {
        formError.value = 'Choisis une date, une heure de début et une heure de fin'
    return
    }
    if (timeStart.value >= timeEnd.value) {
        formError.value = "L'heure de fin doit être après l'heure de début"
    return
    }

    emit('apply', {
    buildings: [...buildings.value],
    floors: [...floors.value],
    capacitiesMin: capacityMin.value,
    modular: modularEnabled.value ? true : null,
    equipements: [...equipements.value],
    date: toLocalISODate(selectedDate.value),
    timeslotstart: timeStart.value,
    timeslotend: timeEnd.value,
    })
}

function reset() {
    buildings.value = []
    floors.value = []
    capacityMin.value = null
    equipements.value = []
    modularEnabled.value = false
    selectedDate.value = null
    timeStart.value = ''
    timeEnd.value = ''
    formError.value = ''
}
</script>

<template>
    <div v-if="open" class="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div class="flex justify-end">
        <button type="button" @click="emit('close')" aria-label="Fermer">
            <img src="../assets/icons/no-svgrepo-com.svg" class="w-4 h-4 cursor-pointer" />
        </button>
    </div>

    <p v-if="!options && !optionsError" class="text-sm text-gray-500">Chargement des filtres...</p>

    <div v-else-if="optionsError" class="text-sm">
        <p class="text-red-600">{{ optionsError }}</p>
        <button type="button" class="underline cursor-pointer" @click="loadOptions">Réessayer</button>
    </div>

    <form v-else-if="options" @submit.prevent="apply">
        <div class="mb-3">
            <p class="font-semibold mb-2">Date</p>
            <VDatePicker v-model="selectedDate" :min-date="today" />
        </div>

        <div class="mb-3 flex gap-4">
            <label class="flex flex-col text-sm">
                Début
            <input type="time" v-model="timeStart" class="border border-gray-300 rounded p-1" />
            </label>
            <label class="flex flex-col text-sm">
                Fin
            <input type="time" v-model="timeEnd" class="border border-gray-300 rounded p-1" />
            </label>
        </div>

        <div class="mb-3">
            <p class="font-semibold mb-2">Building</p>
        <div class="flex flex-wrap gap-4">
            <label v-for="b in options.buildings" :key="b">
            <input type="checkbox" v-model="buildings" :value="b" /> {{ b }}
            </label>
        </div>
        </div>

        <div class="mb-3">
            <p class="font-semibold mb-2">Étage</p>
        <div class="flex flex-wrap gap-4">
            <label v-for="f in options.floors" :key="f">
            <input type="checkbox" v-model="floors" :value="f" /> {{ floorLabel(f) }}
            </label>
        </div>
        </div>

        <div class="mb-3">
            <p class="font-semibold mb-2">Capacité minimale</p>
        <div class="flex flex-wrap gap-4">
            <label>
            <input type="radio" v-model="capacityMin" :value="null" /> Peu importe
            </label>
            <label v-for="c in options.capacities" :key="c">
            <input type="radio" v-model="capacityMin" :value="c" /> {{ c }}+
            </label>
        </div>
        </div>

        <div class="mb-3">
        <p class="font-semibold mb-2">Équipements (tous requis)</p>
        <div class="flex flex-wrap gap-4">
        <label v-for="e in options.equipements" :key="e.id">
            <input type="checkbox" v-model="equipements" :value="e.id" /> {{ e.name }}
        </label>
        </div>
        </div>

        <div class="mb-3 text-center">
            <p class="font-semibold mb-2">Modulable uniquement</p>
        <button
            type="button"
            role="switch"
            :aria-checked="modularEnabled"
            @click="modularEnabled = !modularEnabled"
            :class="modularEnabled ? 'bg-blue-600' : 'bg-gray-300'"
            class="w-12 h-6 rounded-full relative transition-colors duration-200 cursor-pointer">
            <span
            :class="modularEnabled ? 'translate-x-7' : 'translate-x-1'"
            class="absolute top-1 left-0 w-4 h-4 bg-white rounded-full transition-transform duration-200"/>
        </button>
        </div>

        <p v-if="formError" role="alert" class="text-sm text-red-600 mb-2">{{ formError }}</p>

        <div class="flex justify-between">
            <button type="button" @click="reset" class="text-sm underline cursor-pointer">Réinitialiser</button>
            <button type="submit" class="bg-[#00334E] text-white rounded-2xl px-4 py-1 cursor-pointer">Appliquer</button>
        </div>
    </form>
    </div>
</template>