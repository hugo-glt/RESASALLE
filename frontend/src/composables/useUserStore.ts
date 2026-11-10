import { ref, computed } from "vue";
import { api } from "../api/client";

export type RoleName = "Student" | "Teacher" | "Admin";

export interface User {
    id_users: number;
    firstname: string;
    email: string;
    role: { id_roles: string; names: RoleName };
}

// Out of the composable, we keep a single instance of the user state
const user = ref<User | null>(null);
const ready = ref(false); // becomes true after the first fetchMe() call, even if it fails

export function useUserStore() {
    const isLoggedIn = computed(() => user.value !== null);
    const role = computed<RoleName | null>(() => user.value?.role.names ?? null);

    async function login(email: string, password: string) {
        const { data } = await api.post("/login", { email, password });
        user.value = data.user;
    }

    async function logout() {
        try {
            await api.post("/logout");
        } finally {
            user.value = null;
        }
    }

    async function fetchMe() {
        try {
            const { data } = await api.get("/me");
            user.value = data.data; // back returns { data: user }
        } catch {
            user.value = null;
        } finally {
            ready.value = true;
        }
    }

    return { user, role, isLoggedIn, ready, login, logout, fetchMe };
}