<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "../composables/useUserStore";

const router = useRouter();
const { login, role } = useUserStore();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const selectedUser = ref<"Student" | "Teacher" | "Admin" | null>(null);

async function submit() {
    error.value = "";
    loading.value = true;
    try {
        await login(email.value, password.value);
        router.push(role.value === "Admin" ? "/dashboard" : "/");
    } catch (e) {
        error.value =
            axios.isAxiosError(e) && e.response?.status === 401
                ? "Identifiants invalides"
                : "Serveur injoignable, réessaie plus tard";
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">

        <!-- Logo fixé en haut -->
        <div class="logo p-8 pb-0">
            <h1 class="font-italic text-[#00334E]">RESASALLE</h1>
        </div>

        <!-- Contenu centré dans le reste de l'espace -->
        <div class="flex-1 flex items-center justify-center -mt-10">

            <!-- Sélection utilisateur -->
            <section v-if="!selectedUser" class="flex gap-8">
                <div class="card" @click="selectedUser = 'Student'">
                    <img src="../assets/icons/user-3-svgrepo-com.svg" alt="Student" class="w-20 h-20" />
                    <h3>Student</h3>
                </div>
                <div class="card" @click="selectedUser = 'Teacher'">
                    <img src="../assets/icons/user-3-svgrepo-com.svg" alt="Teacher" class="w-20 h-20" />
                    <h3>Teacher</h3>
                </div>
                <div class="card" @click="selectedUser = 'Admin'">
                    <img src="../assets/icons/user-3-svgrepo-com.svg" alt="Admin" class="w-20 h-20" />
                    <h3>Admin</h3>
                </div>
            </section>

            <!-- Formulaire -->
            <section v-else class="flex items-center gap-10">
                <div class="flex flex-col gap-0 content-center items-center p-5 -mt-5">
                    <img src="../assets/icons/user-3-svgrepo-com.svg" alt="type" class="w-20 h-20" />
                    <h3 class="mt-1">{{ selectedUser }}</h3>
                    <button @click="selectedUser = null" class="text-gray-400 text-[0.60rem]">
                        ← Changer de profil
                    </button>
                </div>
                <div class="border-2 border-[#00334E] rounded-2xl p-6 w-75">
                    <form class="flex flex-col gap-4" @submit.prevent="submit">
                        <input class="border border-[#00334E] rounded-2xl p-2" type="text" placeholder="Username" />
                        <input class="border border-[#00334E] rounded-2xl p-2" type="password" placeholder="Password" />
                        <button class="bg-[#00334E] text-white rounded-2xl p-2">Login</button>
                    </form>
                </div>
            </section>
        </div>
    </div>
</template>