<script setup>
const props = defineProps(['companyName', 'positionTitle', 'startDate', 'endDate', 'desc']);

</script>
<template>
    <v-card>
        <v-row justify="space-between" align="center">
            <v-col cols="auto">
                <v-card-subtitle>{{ companyName }}</v-card-subtitle>
            </v-col>
            <v-col cols="auto">
                <v-card-text class="dateRow">
                    <p>
                        {{ props.startDate.getMonth() + 1 }}/{{ props.startDate.getFullYear()
                        }}
                    </p>
                    <p>-</p>
                    <p v-if="endDate != ''">
                        {{ props.endDate.getMonth() + 1 }}/{{ props.endDate.getFullYear()
                        }}
                    </p>
                </v-card-text>
            </v-col>
        </v-row>
        <v-card-title class="cardPositionTitle">{{ positionTitle }}</v-card-title>
        <v-card-text>
            <p>
                {{ props.desc }}
            </p>
        </v-card-text>
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