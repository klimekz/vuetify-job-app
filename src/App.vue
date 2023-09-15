<script setup>
import ApplicationPanel from './components/ApplicationPanel.vue';
</script>

<template>
  <v-app>
    <v-app-bar app class="navbar " style="color: grey">
      <v-app-bar-nav-icon class="navicon" />
      Vuetify Job Application
    </v-app-bar>
    <v-main app>
      <ApplicationPanel />
    </v-main>
    <v-footer app class="footerSpan">
      <h4><a href="https://www.github.com/klimekz">klimekz</a></h4>
      <h4> S'2023</h4>
    </v-footer>
  </v-app>
</template>

<style scoped>
.v-main {
  margin-top: 9vh;
  width: 400px;
  margin-bottom: 5vh;
}

.footerSpan {
  display: flex;
  justify-content: space-between;
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
