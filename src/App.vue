<script setup>
import ApplicationPanel from './components/ApplicationPanel.vue';
</script>

<template>
  <v-app>
    <v-app-bar app class="navbar " style="color: grey">
      <!-- <v-row align="center" justify="space-between"> -->
      <v-toolbar-title>
        Vuetify Job App
      </v-toolbar-title>
      <a href="https://www.github.com/klimekz">
        <v-btn>
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </a>
      <!-- </v-row> -->
    </v-app-bar>
    <v-main app>
      <ApplicationPanel />
    </v-main>
    <v-footer app class="footerSpan">
      <p> S'2023</p>
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
  flex-direction: row-reverse;
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
