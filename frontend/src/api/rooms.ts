import { api } from './client'

export interface FilterOptions {
    buildings: string[]
    floors: number[]
    capacities: number[]
    equipements: { id: number; name: string }[]
}

export interface Room {
    id_rooms: number
    numbers: number
    floors: number
    buildings: string
    modularities: boolean
    capacities: number
    equipements: { idEquipements: number; description: string }[]
}

export interface RoomFilters {
    buildings: string[]
    floors: number[]
    capacitiesMin: number | null
    modular: boolean | null // null = peu importe
    equipements: number[]
    date: string // YYYY-MM-DD
    timeslotstart: string // HH:MM
    timeslotend: string // HH:MM
}

export async function getFilters(): Promise<FilterOptions> {
    const { data } = await api.get('/rooms/filters')
    return data.data
}

export async function searchRooms(f: RoomFilters): Promise<Room[]> {
    const params: Record<string, string | number | boolean> = {}

    if (f.buildings.length) params.buildings = f.buildings.join(',')
    if (f.floors.length) params.floors = f.floors.join(',')
    if (f.capacitiesMin !== null) params.capacities_min = f.capacitiesMin
    if (f.modular !== null) params.modularities = f.modular
    if (f.equipements.length) params.equipements = f.equipements.join(',')

    params.date = f.date
    params.timeslotstart = f.timeslotstart
    params.timeslotend = f.timeslotend

    const { data } = await api.get('/rooms/search', { params })
    return data.data
}