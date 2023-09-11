<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps(['modal'])
const companyName = ref("")
const positionTitle = ref("")
const experienceText = ref("")
const startMonth = ref("")
const endMonth = ref("")
</script>
<template>
    <v-dialog v-model="props.modal">
        <v-card>
            <v-card-title>Work Experience</v-card-title>
            <v-card-text>
                <v-text-field @change="console.log(companyName)" v-model="companyName" label="Company Name"></v-text-field>
                <v-text-field v-model="positionTitle" label="Position"></v-text-field>
                <v-textarea v-model="experienceText" label="Relevant Experience"></v-textarea>
            </v-card-text>
            <v-card-text>
                <v-text-field v-model="startMonth" type="date" label="Start Date"></v-text-field>
                <v-text-field v-model="endMonth" type="date" label="End Date"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary">Save</v-btn>
                <v-btn>Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>