<template>
  <div>
    <h1>Admin Panel</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ message: string }>()
</script>