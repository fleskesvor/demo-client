<script setup lang="ts">
import { authentication } from "../plugins/auth.ts";

</script>

<template>
  <h3>Hello, World!</h3>

  <label>Access token
    <textarea v-if="authentication.isAuthenticated" rows="5" cols="200"
              readonly>{{ authentication.accessToken }}</textarea>
  </label>

  <label>Parsed access token
    <textarea v-if="authentication.isAuthenticated" rows="15" cols="200"
              readonly>{{ authentication.parsedAccessToken }}</textarea>
  </label>
</template>

<style scoped>
</style>
