<script setup lang="ts">
import { useRoute } from 'vue-router'
import NavBar from './layouts/NavBar.vue'

const route = useRoute()
</script>

<template>
  <NavBar v-if="!route.meta?.hideNavbar" />
  <router-view />
  <!--Nav temporaire pour access rapide sans authenfication-->
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/login">Connexion</router-link>
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/teachers/search">Search</router-link>
  </nav>
</template>