<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from "@/stores/auth"
import { storeToRefs } from 'pinia';
import router from '@/router';
const authStore = useAuthStore()

const { getUserId } = storeToRefs(authStore)

const login = async (evt:any) => {
    evt.preventDefault();
    await authStore.login({username: username.value, password: password.value})
    router.push({name: 'HomePage'})

}

const username = ref('')
const password = ref('')

onMounted(() => {
  if (getUserId.value) {
    router.push({ name: 'homePage' })
  }
}
)
</script>

<template>
  <div class="p-4">
    <div class="text-xl mb-3">
      Login
    </div>
    <form class="flex flex-column w-2" @submit="login">
      <div class="mb-3 flex flex-column">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" v-model="username">
      </div>
      <div class="flex flex-column">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary mt-3">Submit</button>
    </form>
    <p>No account? <router-link to="/registration">Sign up</router-link></p>
  </div>
</template>