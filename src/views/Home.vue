<template>
    <div class="p-4">
        <div class="flex align-items-end justify-content-between pb-4 border-bottom-1">
            <div class="text-xl">
                <div>Benvenuto <b>{{ user.username }}</b>!</div>
            </div>
            <button @click="onLogout">Esci</button>
        </div>

        <RouterView />
    </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth"
import { storeToRefs } from "pinia";
import router from "@/router";
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const onLogout = async () => {
    authStore.logout()
    router.push({name: 'RootPage'})
}
</script>