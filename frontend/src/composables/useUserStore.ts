import { ref } from 'vue'

const selectedUser = ref<string | null>(null)

export function useUserStore() {
    return { selectedUser }
}