<script setup>
const props = defineProps(['instName', 'degreeLevel', 'startDate', 'endDate', 'major']);

</script>
<template>
    <v-card>
        End date:{{ props.endDate }}
        <v-row justify="space-between" align="center">
            <v-col cols="auto">
                <v-card-subtitle>{{ props.degreeLevel }}</v-card-subtitle>
            </v-col>
            <v-col cols="auto">
                <v-card-text class="dateRow">
                    <p>
                        {{ props.startDate.getMonth() + 1 }}/{{ props.startDate.getFullYear()
                        }}
                    </p>
                    <p>-</p>
                    <p v-if="props.endDate != ''">
                        {{ props.endDate.getMonth() + 1 }}/{{ props.endDate.getFullYear()
                        }}
                    </p>
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