<script setup>
import { ref } from 'vue';
import universities from "../data/uni_list.json"
const props = defineProps(['modal']);
const instName = ref("");
const degreeLevel = ref("");
const major = ref("")
const startDate = ref(undefined)
const endDate = ref(undefined)
const inProgress = ref(false);
const instNotListed = ref(false);
const educationOptions = ["High School Diploma or Equivalent", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral Degree", "Certification/Bootcamp Experience"];
const usUniOptions = universities.Universities
const emit = defineEmits()

function clearInstName() {
    instName.value = "";
}

function emitCloseEdu() {
    emit('cancel-edu', null);
}

function emitSaveEdu() {
    if (instName.value != '' && degreeLevel.value != '' && startDate.value != '') {
        if (inProgress || (!inProgress.value && endDate.value != "")) {
            const educationData = {
                'instName': instName.value,
                'degreeLevel': degreeLevel.value,
                'major': major.value,
                'startDate': new Date(startDate.value),
                'endDate': inProgress.value ? "" : new Date(endDate.value),
            };
            emit('save-edu', educationData);
            instName.value = ''
            degreeLevel.value = ''
            major.value = ''
            startDate.value = ''
            endDate.value = ''
        }
    }
}

</script>    
<template >
    <v-dialog v-model="props.modal">
        <v-card>
            <v-card-title>Education Experience</v-card-title>
            <form @submit.prevent="emitSaveEdu">
                <v-card-text v-if="instNotListed">
                    <v-text-field v-model="instName" label="Institution Name"></v-text-field>
                </v-card-text>
                <v-card-text v-if="!instNotListed">
                    <v-select v-model="instName" search label="Institution Name" :items="usUniOptions"></v-select>
                </v-card-text>
                <v-card-text>
                    <v-row justify="center">
                        <v-col cols="6">
                            <v-select v-model="degreeLevel" search label="Degree Level"
                                :items="educationOptions"></v-select>
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
                    <v-btn type="submit" color="primary">Save</v-btn>
                    <v-btn @click="emitCloseEdu">Cancel</v-btn>
                </v-card-actions>
            </form>
        </v-card>
    </v-dialog>
</template >

<style scoped>
form {
    padding-right: 1.3em;
    padding-left: 1.3em;
}
</style>

