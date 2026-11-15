<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SortingDropdown from '../../../layouts/SortingDropdown.vue'
import RoomCard from '../../../components/RoomCards.vue'
import { searchRooms } from '../../../api/rooms'
import type { Room, RoomFilters } from '../../../api/rooms'

const router = useRouter()

const filterOpen = ref(true)
const rooms = ref<Room[]>([])
const loading = ref(false)
const error = ref('')
const searched = ref(false)
const lastFilters = ref<RoomFilters | null>(null)

// Une réponse lente d'une ancienne recherche ne doit pas écraser la plus récente
let requestId = 0

async function onApply(filters: RoomFilters) {
  const myId = ++requestId
  lastFilters.value = filters
  loading.value = true
  error.value = ''
  searched.value = true
  try {
    const result = await searchRooms(filters)
    if (myId !== requestId) return
    rooms.value = result
  } catch {
    if (myId !== requestId) return
    rooms.value = []
    error.value = 'Impossible de lancer la recherche, réessaie dans un instant'
  } finally {
    if (myId === requestId) loading.value = false
  }
}

function openRoom(room: Room) {
  const f = lastFilters.value
  router.push({
    name: 'result',
    query: {
      id: String(room.id_rooms),
      ...(f ? { date: f.date, start: f.timeslotstart, end: f.timeslotend } : {}),
    },
  })
}
</script>

<template>
  <div class="flex flex-col md:flex-row items-start justify-center gap-8 p-8 min-h-screen">
    <aside class="w-full md:w-80">
      <SortingDropdown
        :open="filterOpen"
        @close="filterOpen = false"
        @apply="onApply"
        class="max-h-[85vh] overflow-y-auto"
      />
      <button
        v-if="!filterOpen"
        type="button"
        @click="filterOpen = true"
        class="underline text-sm cursor-pointer"
      >
        Modifier les filtres
      </button>
    </aside>

    <section class="flex-1 w-full max-w-3xl">
      <h2 class="text-2xl font-bold mb-4">SALLES DISPONIBLES</h2>

      <p v-if="loading" class="text-gray-500">Recherche en cours...</p>

      <p v-else-if="error" role="alert" class="text-red-600">{{ error }}</p>

      <p v-else-if="!searched" class="text-gray-500">
        Choisis une date et un créneau, puis clique sur Appliquer.
      </p>

      <p v-else-if="rooms.length === 0" class="text-gray-500">
        Aucune salle disponible sur ce créneau avec ces critères.
      </p>

      <div v-else class="grid gap-4 sm:grid-cols-2">
        <RoomCard v-for="r in rooms" :key="r.id_rooms" :room="r" @select="openRoom" />
      </div>
    </section>
  </div>
</template>