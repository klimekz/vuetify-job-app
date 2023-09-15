

<template>
    <div class="formContainer">
        <div class="descriptionContext formContainer">
            <h3>Job Description</h3>
            <h5>{{ jobLocation }}</h5>
            <p class="contentP" v-for="p in jobDescTextSet">{{ p }}</p>
        </div>
        <div class="descriptionContext formContainer">
            <h3>Responsibilities</h3>
            <p class="contentP" v-for="p in jobRespTextSet"> {{ p }}</p>
        </div>
        <div class="descriptionContext ">
            <h3>Qualifications</h3>
            <p class="contentP" v-for="p in jobQualTextSet"> {{ p }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const jobLocation = ref("City, ST (Remote/Hybrid)")
const jobDescTextSet = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla orci, tincidunt vitae leo vel, euismod mattis metus. Vivamus placerat velit eget ante euismod varius. Quisque magna velit, bibendum non arcu vel, ullamcorper cursus nunc. Quisque posuere nec tortor in ultrices. Nullam commodo facilisis consectetur. Praesent sagittis facilisis mattis. Nulla.", "elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo", "enim eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc"]
const jobRespTextSet = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla orci, tincidunt vitae leo vel, euismod mattis metus. Vivamus placerat velit eget ante euismod varius. Quisque magna velit, bibendum non arcu vel, ullamcorper cursus nunc. Quisque posuere nec tortor in ultrices. Nullam commodo facilisis consectetur. Praesent sagittis facilisis mattis. Nulla.", "elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo", "porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc"]
const jobQualTextSet = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla orci, tincidunt vitae leo vel, euismod mattis metus. Vivamus placerat velit eget ante euismod varius. Quisque magna velit, bibendum non arcu vel, sagittis facilisis mattis. Nulla.", "elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo", "enim eu turpis egestaicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc"]
</script>

<style scoped>
h3 {
    margin-bottom: .6em;
}

h5 {
    margin-bottom: 1em;
}
</style>