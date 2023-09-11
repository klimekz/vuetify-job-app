<template>
    <v-dialog v-model="props.modal">
        <v-card>
            <v-card-title>Education</v-card-title>
            <v-card-text>
                <v-text-field label="Institution Name"></v-text-field>
                <v-text-field label="Degree Level"></v-text-field>
                <v-text-area label="Relevant Coursework"></v-text-area>
            </v-card-text>
            <v-card-text>
                <v-text-field type="Month" label="Start Date"></v-text-field>
                <v-text-field type="Month" label="End Date"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary">Save</v-btn>
                <v-btn>Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps(['modal'])
console.log(props)// console.log(props)
</script>