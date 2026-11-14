<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { getBookingsByDate } from '../api/bookings'
import type { FeedBooking } from '../api/bookings'

function toLocalISODate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const emit = defineEmits<{ (e: 'toggle-filter'): void }>()

const currentDate = ref(new Date())
const bookings = ref<FeedBooking[]>([])
const loading = ref(false)
const error = ref('')

const formattedDate = computed(() =>
    currentDate.value.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }),
)
const isToday = computed(() => toLocalISODate(currentDate.value) === toLocalISODate(new Date()))

function changeDay(offset: number) {
    const d = new Date(currentDate.value)
    d.setDate(d.getDate() + offset)
    currentDate.value = d
}
function goToday() { currentDate.value = new Date() }

const hhmm = (t: string) => t.slice(0, 5)
const floorLabel = (f: number) => (f === 0 ? 'RDC' : `Étage ${f}`)

let requestId = 0

async function loadBookings() {
    const myId = ++requestId
    loading.value = true
    error.value = ''
    try {
        const result = await getBookingsByDate(toLocalISODate(currentDate.value))
        if (myId !== requestId) return
        bookings.value = result
    } catch (e) {
        if (myId !== requestId) return
        bookings.value = []
        error.value =
            axios.isAxiosError(e) && e.response?.status === 401
        ? 'Session expirée, reconnecte-toi'
        : 'Impossible de charger les réservations'
    } finally {
        if (myId === requestId) loading.value = false
    } 
}

watch(currentDate, loadBookings, { immediate: true })
</script>

<template>
    <section class="w-125 h-125 bg-gray-300 relative p-6 flex flex-col">
        <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
            <button @click="changeDay(-1)" class="cursor-pointer" aria-label="Jour précédent">
                <img src="../assets/icons/arrow-left-svgrepo-com.svg" class="w-5 h-5" />
            </button>
            <span class="font-semibold capitalize w-56 text-center">{{ formattedDate }}</span>
            <button @click="changeDay(1)" class="cursor-pointer" aria-label="Jour suivant">
                <img src="../assets/icons/arrow-right-svgrepo-com.svg" class="w-5 h-5" />
            </button>
        </div>

        <button @click="emit('toggle-filter')" class="cursor-pointer" aria-label="Filtres">
            <img src="../assets/icons/funnel-sort-svgrepo-com.svg" class="w-5 h-5" />
        </button>
        </div>

    <div class="h-1 bg-gray-600 mt-4 w-full"></div>

    <button v-if="!isToday" @click="goToday" class="self-start text-xs underline mt-2 cursor-pointer">
        Revenir à aujourd'hui
    </button>

    <!-- Corps du feed : défile si la liste dépasse la hauteur de la box -->
    <div class="flex-1 min-h-0 overflow-y-auto mt-4">
        <p v-if="loading" class="text-gray-500 text-center mt-8">Chargement...</p>

        <div v-else-if="error" class="text-center mt-8">
            <p class="text-red-600">{{ error }}</p>
        <button @click="loadBookings" class="underline text-sm mt-2 cursor-pointer">Réessayer</button>
        </div>

        <p v-else-if="bookings.length === 0" class="text-gray-500 text-center mt-8">
        Aucune réservation ce jour
        </p>

        <ul v-else class="flex flex-col gap-3">
        <li v-for="b in bookings" :key="b.idBooking" class="bg-white rounded-lg p-3 shadow-sm">
            <div class="flex justify-between font-semibold">
                <span>{{ hhmm(b.timeslotstart) }} – {{ hhmm(b.timeslotend) }}</span>
                <span>Salle {{ b.room.numbers }}</span>
                </div>
                    <p class="text-sm text-gray-600">{{ b.room.buildings }} · {{ floorLabel(b.room.floors) }}</p>
                    <p class="mt-1">{{ b.subject }}</p>
                    <p class="text-sm text-gray-500">{{ b.user?.firstname ?? '—' }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>