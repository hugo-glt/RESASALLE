<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "../composables/useUserStore";

const router = useRouter();
const { login, logout, role } = useUserStore();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const selectedUser = ref<"Student" | "Teacher" | "Admin" | null>(null);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function changeProfile() {
    selectedUser.value = null;
    email.value = "";
    password.value = "";
    error.value = "";
}

function messageFor(e: unknown): string {
    if (axios.isAxiosError(e)) {
        if (!e.response) return "Serveur injoignable, réessaie plus tard";
        if (e.response.status === 401) return "Identifiants invalides pour ce profil"; // [P5]
        if (e.response.status === 429) return "Trop de tentatives, réessaie dans quelques minutes";
    }
    return "Une erreur est survenue, réessaie plus tard";
}

async function submit() {
    if (loading.value) return;

    error.value = "";
    const cleanEmail = email.value.trim(); 

    if (!cleanEmail || !password.value) {
        error.value = "Renseigne ton email et ton mot de passe";
        return;
    }
    if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 80 || password.value.length > 128) {
        error.value = "Adresse email invalide";
        return;
    }

    loading.value = true;
    try {
        await login(cleanEmail, password.value);

        if (selectedUser.value && role.value !== selectedUser.value) {
            await logout();
            error.value = "Identifiants invalides";
            return;
        }

        router.push(role.value === "Admin" ? "/dashboard" : "/");
    } catch (e) {
        error.value = messageFor(e);
    } finally {
        password.value = "";
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
                    <button type="button" @click="changeProfile" class="text-gray-400 text-[0.60rem]">
                        ← Changer de profil
                    </button>
                </div>
                <div class="border-2 border-[#00334E] rounded-2xl p-6 w-75">
                    <form class="flex flex-col gap-4" @submit.prevent="submit">
                        <label for="email" class="sr-only">Email</label>
                        <input
                            id="email"
                            v-model="email"
                            class="border border-[#00334E] rounded-2xl p-2"
                            type="email"
                            placeholder="Email"
                            autocomplete="username"
                            maxlength="80"
                            required
                            :disabled="loading"
                        />

                        <label for="password" class="sr-only">Mot de passe</label>
                        <input
                            id="password"
                            v-model="password"
                            class="border border-[#00334E] rounded-2xl p-2"
                            type="password"
                            placeholder="Password"
                            autocomplete="current-password"
                            maxlength="128"
                            required
                            :disabled="loading"
                        />

                        <p v-if="error" role="alert" class="text-sm text-red-600">{{ error }}</p>

                        <button
                            type="submit"
                            :disabled="loading"
                            class="bg-[#00334E] text-white rounded-2xl p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{ loading ? "Connexion..." : "Login" }}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    </div>
</template>