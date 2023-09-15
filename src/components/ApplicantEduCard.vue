<script setup>
import { ref } from 'vue';
const props = defineProps(['instName', 'degreeLevel', 'startDate', 'endDate', 'major']);
const inProgress = ref(false)

function formatDate(d) {
    if (d === '') {
        return false
    }
    else {
        inProgress.value = false
        return new Date(d).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            timeZone: 'UTC' // Specify the time zone as UTC
        })
    }
}

</script>
<template>
    <v-card>
        <v-row justify="space-between" align="center">
            <v-col cols="auto">
                <v-card-subtitle>{{ props.degreeLevel }}</v-card-subtitle>
            </v-col>
            <v-col cols="auto ">
                <v-card-text class="dateRow">
                    <p>{{ formatDate(props.startDate) }}</p>
                    <p>-</p>
                    <p v-if="!inProgress">{{ formatDate(props.endDate) ? formatDate(props.endDate) : "" }}</p>
                </v-card-text>
            </v-col>
        </v-row>
        <v-card-title class="cardPositionTitle">{{ props.instName }}</v-card-title>
        <br>
        <v-card-subtitle>
            {{ props.major }}
        </v-card-subtitle>
        <br>
    </v-card>
</template>

<style scoped>
.v-card {
    margin-top: 1em;
    margin-bottom: 1.5em;
}

.v-card:hover {
    transform: scale(1.015);
}
</style>