<template>
  <div class="p-4">
    <div
      class="flex align-items-end justify-content-between pb-4 border-bottom-1"
    >
      <div class="text-xl">
        <div>
          Benvenuto <b>{{ getUsername }}</b
          >!
        </div>
      </div>
      <button @click="onLogout">Esci</button>
    </div>

    <RouterView />
    <div class="border-top-1 mt-6">
      <div class="py-4" style="color: red">
        <div class="text-xl">Issues</div>
        <ul>
          <li>Handle JWT expires time</li>
          <li>Use before Enter Guard instead of checking token in onMouted hook</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import router from "@/router";
const authStore = useAuthStore();
const { getUsername } = storeToRefs(authStore);

const onLogout = async () => {
  authStore.logout();
  router.push({ name: "RootPage" });
};
</script>
