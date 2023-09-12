<script setup>
import { defineProps, ref } from 'vue';
import countries from "../data/country_list.json"
const props = defineProps(['modal']);
const instName = ref("");
const degreeLevel = ref("");
const major = ref("")
const startDate = ref(undefined)
const endDate = ref(undefined)
const inProgress = ref(false);
const instNotListed = ref(false);
const educationOptions = ["High School Diploma or Equivalent", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral Degree", "Certification/Bootcamp Experience"];
const usUniOptions = countries.Countries
const emit = defineEmits()

function clearInstName() {
    instName.value = "";
}

function emitCloseEdu() {
    emit('cancel-edu', null);
}

function emitSaveEdu() {
    const educationData = {
        'instName': instName.value,
        'degreeLevel': degreeLevel.value,
        'major': major.value,
        'startDate': new Date(startDate.value),
        'endDate': new Date(endDate.value)
    };
    emit('save-edu', educationData);
}

</script>    
<template >
    <v-dialog v-model="props.modal">
        <v-card>
            <v-card-title>Education Experience</v-card-title>
            <v-card-text v-if="instNotListed">
                <v-text-field v-model="instName" label="Institution Name"></v-text-field>
            </v-card-text>
            <v-card-text v-if="!instNotListed">
                <v-select v-model="instName" search label="Institution Name" :items="usUniOptions"></v-select>
            </v-card-text>
            <v-card-text>
                <v-row justify="center">
                    <v-col cols="6">
                        <v-select search label="Degree Level" :items="educationOptions"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="Major" v-model="major"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text>
                <v-row justify="center">
                    <v-col cols="inProgress ? 12 : 6">
                        <v-text-field v-model="startDate" type="date" label="Start Date"></v-text-field>
                    </v-col>
                    <v-col cols="6" v-if="!inProgress">
                        <v-text-field v-model="endDate" type="date" label="End Date"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <div class="center">
                <v-checkbox v-model="inProgress" label="In Progress"></v-checkbox>
            </div>
            <div class="center">
                <v-checkbox @change="clearInstName" v-model="instNotListed" label="Institution Not Listed"></v-checkbox>
            </div>
            <v-card-actions>
                <v-btn @click="emitSaveEdu" color="primary">Save</v-btn>
                <v-btn @click="emitCloseEdu">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template >

<style>
.center {
    margin-left: 2em;
}
</style>