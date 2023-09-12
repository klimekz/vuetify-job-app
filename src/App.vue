<script setup>
import { ref } from "vue"
import ApplicationPanel from './components/ApplicationPanel.vue';
</script>

<template>
  <v-app>
    <v-app-bar app class="navbar" style="color: grey">
      <v-app-bar-nav-icon class="navicon" />
      Job Application
    </v-app-bar>
    <v-main app>
      <ApplicationPanel />
    </v-main>
    <v-footer app>
      <span>
        <h4>2023</h4>
      </span>
    </v-footer>
  </v-app>
</template>

<style scoped>
.v-main {
  margin-top: 9vh;
  width: 400px;
  margin-bottom: 5vh;
}

.navbar {
  height: 10vh;
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
