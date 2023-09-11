<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps(['modal']);
const instName = ref("");
const inProgress = ref(false);
const educationOptions = ["High School Diploma or Equivalent", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral Degree", "Certification/Bootcamp Experience"];
</script>    
<template >
    <!-- {{ instName }} -->
    <v-dialog v-model="props.modal">
        <v-card>
            <v-card-title>Education Experience</v-card-title>
            <v-card-text>
                <v-text-field v-model="instName" label="Institution Name"></v-text-field>
            </v-card-text>
            <v-card-text>
                <v-select search label="Degree Level" :items="educationOptions"></v-select>
            </v-card-text>
            <v-card-text>
                <v-text-field type="date" label="Start Date"></v-text-field>
            </v-card-text>
            <v-card-text v-if="!inProgress">
                <v-text-field type="date" label="End Date"></v-text-field>
            </v-card-text>
            <div class="center">
                <v-checkbox v-model="inProgress" label="In Progress"></v-checkbox>
            </div>
            <v-card-actions>
                <v-btn color="primary">Save</v-btn>
                <v-btn>Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template >

<style>
.center {
    margin-left: 2em;
}
</style>