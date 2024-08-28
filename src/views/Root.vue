<template>
  <div class="p-4">
    <div class="text-xl">Home Page</div>
    <p>Benvenuto nella home page!</p>

    <div class="flex flex-column">
      <router-link to="/about">Vai alla pagina About</router-link>
      <router-link to="/login">Vai alla pagina Login</router-link>
      <router-link to="/registration">Vai alla pagina Registration</router-link>
    </div>

  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>