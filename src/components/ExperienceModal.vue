<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps(['modal'])
const companyName = ref("")
const positionTitle = ref("")
const experienceText = ref("")
const startDate = ref("")
const endDate = ref("")
const emit = defineEmits();

function emitCancelExp() {
    emit('cancel-exp', null);
}

function emitSaveExp() {
    const experienceData = {
        name: companyName.value,
        title: positionTitle.value,
        experience: experienceText.value,
        startDate: new Date(startDate.value),
        endDate: new Date(endDate.value)
    }
    emit('save-exp', experienceData)
}

</script>
<template>
    <v-dialog v-model="props.modal">
        <v-card>
            {{ experienceText }}
            <v-card-title>Work Experience</v-card-title>
            <v-card-text>
                <v-text-field v-model="companyName" @change="console.log(companyName)" label="Company Name"></v-text-field>
                <v-text-field v-model="positionTitle" label="Position"></v-text-field>
                <v-textarea v-model="experienceText" label="Relevant Experience"></v-textarea>
            </v-card-text>
            <v-card-text>
                <v-text-field v-model="startDate" type="date" label="Start Date"></v-text-field>
                <v-text-field v-model="endDate" type="date" label="End Date"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="emitSaveExp" color="primary">Save</v-btn>
                <v-btn @click="emitCancelExp">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>