import { api } from './client'

export interface FeedBooking {
    idBooking: number
    dates: string
    timeslotstart: string
    timeslotend: string
    subject: string
    room: { id_rooms: number; numbers: number; floors: number; buildings: string }
    user: { id_users: number; firstname: string } | null
}

export async function getBookingsByDate(date: string): Promise<FeedBooking[]> {
    const { data } = await api.get('/bookings', { params: { date } })
    return data.data 
}