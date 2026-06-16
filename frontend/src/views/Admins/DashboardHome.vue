<script setup lang="ts">

</script>

<template>
    <div class="flex items-start justify-center gap-10 p-8 min-h-screen">
    <section>
        <div class="flex items-center gap-4">
            <h2 class="text-2xl font-bold mb-4">ADMIN</h2>
            <h2 class="text-2xl font-bold mb-4">DASHBOARD</h2>
            <img src="../../assets/icons/shield-svgrepo-com.svg" class="w-5 h-5 mb-4" />
        </div>
        <!-- Boutons LOGS et ADD -->
        <div class="flex items-center gap-4">
            <button>
                <img src="../../assets/icons/logs-svgrepo-com.svg" class="w-5 h-5" />
                <span class="ml-2">LOGS</span>
            </button>
            <button>
                <img src="../../assets/icons/plus-large-svgrepo-com.svg" class="w-5 h-5" />
                <span class="ml-2">ADD</span>
            </button>
        </div>
    </section>
    <section>
        <div class="w-75 h-100 bg-gray-300 relative">
            <img src="../../assets/icons/funnel-sort-svgrepo-com.svg" class="w-5 h-5" />
            <div class="w-60 h-1 bg-gray-500"></div>
        </div>
    </section>
    </div>
</template>

