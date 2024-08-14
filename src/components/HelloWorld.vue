<script setup lang="ts">
import { authentication } from "../plugins/auth.ts";
import { ref } from "vue";

const exchangedAccessToken = ref("")

const exchangeToken = () => {
  console.debug("Send token exchange request");
  fetch("http://localhost:8080/oauth2/token", {
    method: "POST",
    headers: {
      "Authorization": "Basic dG9rZW4tY2xpZW50OnRva2Vu" // "token-client:token" base64 encoded
    },
    body: JSON.stringify({
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      scope: "message.read",
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
      subject_token: authentication.accessToken
    })
  })
      .then((response) => console.debug(`Response: ${response}`))
      .catch((error) => console.debug(`Response: ${error}`))
};
</script>

<template>
  <h3>Hello, World!</h3>

  <label v-if="authentication.isAuthenticated">
    Access token
    <textarea rows="5" cols="200" readonly>{{ authentication.accessToken }}</textarea>
  </label>

  <label v-if="authentication.isAuthenticated">
    Parsed access token
    <textarea rows="15" cols="200" readonly>{{ authentication.parsedAccessToken }}</textarea>
  </label>

  <div>
    <input type="button" value="Exchange token" @click="exchangeToken">
  </div>

  <label v-if="exchangedAccessToken">
    Exchanged access token
    <textarea rows="15" cols="200" readonly>{{ exchangedAccessToken }}</textarea>
  </label>
</template>

<style scoped>
</style>
