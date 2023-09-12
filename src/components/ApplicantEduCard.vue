<script setup>
import { defineProps } from 'vue';
const props = defineProps(['instName', 'degreeLevel', 'startDate', 'endDate', 'major']);

</script>
<template>
    <v-card>
        <v-row justify="space-between" align="center">
            <v-col cols="auto">
                <v-card-subtitle>{{ props.degreeLevel }}</v-card-subtitle>
            </v-col>
            <v-col cols="auto">
                <v-card-text class="startCol">
                    {{ props.startDate.getMonth() + 1 }}/{{ props.startDate.getFullYear()
                    }}
                    -
                    {{ props.endDate.getMonth() + 1 }}/{{ props.endDate.getFullYear()
                    }}
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