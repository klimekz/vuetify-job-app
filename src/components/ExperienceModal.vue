<script setup>
import { ref } from 'vue'
const props = defineProps(['modal'])
const companyName = ref("")
const positionTitle = ref("")
const experienceText = ref("")
const startDate = ref("")
const endDate = ref("")
const isCurrentPosition = ref(false)
const emit = defineEmits();

function emitCancelExp() {
    emit('cancel-exp', null);
}

function emitSaveExp() {
    if (companyName.value != '' && positionTitle.value != '' && startDate.value != '') {
        if ((endDate.value == "" && isCurrentPosition.value) || (endDate.value != "" && !isCurrentPosition.value)) {
            const experienceData = {
                companyName: companyName.value,
                positionTitle: positionTitle.value,
                positionDesc: experienceText.value,
                startDate: new Date(startDate.value),
                endDate: isCurrentPosition ? "" : new Date(endDate.value)
            }
            emit('save-exp', experienceData)
            companyName.value = ""
            positionTitle.value = ""
            experienceText.value = ""
            startDate.value = ""
        }
    }
}

</script>
<template>
    <v-dialog v-model="props.modal">
        <v-card>
            <v-card-title>Work Experience</v-card-title>
            <form @submit.prevent="emitSaveExp">
                <v-card-text>
                    <v-text-field v-model="companyName" label="Company Name"
                        :rules="[(t) => { return t ? true : 'You must enter a company name.' }]" />
                    <v-text-field v-model="positionTitle" label="Position"
                        :rules="[(t) => { return t ? true : 'You must enter a position title.' }]" />
                    <v-textarea v-model="experienceText" label="Relevant Experience"></v-textarea>
                </v-card-text>
                <v-card-text>
                    <v-row class="center">
                        <v-col cols="isCurrentPosition ? 12 : 6">
                            <v-text-field v-model="startDate" type="date" label="Start Date"
                                :rules="[(t) => { return t ? true : 'You must enter a start date.' }]"></v-text-field>
                        </v-col>
                        <v-col v-if="!isCurrentPosition" cols="6">
                            <v-text-field v-if="!isCurrentPosition" v-model="endDate" type="date" label="End Date"
                                :rules="[(t) => { return t ? true : 'You must enter an end date.' }]"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <div class="center">
                    <v-checkbox v-model="isCurrentPosition" label="Current Position"></v-checkbox>
                </div>
                <v-card-actions>
                    <v-btn color="primary" type="submit">Save</v-btn>
                    <v-btn @click="emitCancelExp">Cancel</v-btn>
                </v-card-actions>
            </form>
        </v-card>
    </v-dialog>
</template>


<style scoped>
form {
    padding-right: 1.3em;
    padding-left: 1.3em;
}
</style>