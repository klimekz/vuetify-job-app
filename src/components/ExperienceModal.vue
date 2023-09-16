<script setup>
import { computed, ref, onMounted } from 'vue'
const props = defineProps(['modal', 'startValues'])
const companyName = ref("")
const positionTitle = ref("")
const experienceText = ref("")
const startDate = ref("")
const endDate = ref("")
const id = ref("")
const isCurrentPosition = ref(false)
const emit = defineEmits();
const isEditEnabled = computed(() => props.modal);

function emitCancelExp() {
    emit('cancel-exp', null);
}

function emitDeleteExp() {
    if (props.startValues != null) {
        emit('delete-exp', id.value)
    }
}

function getStringDate(d) {
    if (d == "") {
        isCurrentPosition.value = true;
        return new Date().getFullYear() + 1 + "-01-01"
    }
    else {
        // Formats as a UTC string to work around timezone errors
        const dateArray = d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'UTC'
        }).split("/")
        return dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1]
    }
}

function emitSaveExp() {
    if (companyName.value != '' && positionTitle.value != '' && startDate.value != '') {
        let experienceData = undefined
        if (isCurrentPosition.value) {
            console.log("if")
            experienceData = {
                companyName: companyName.value,
                positionTitle: positionTitle.value,
                positionDesc: experienceText.value,
                startDate: new Date(startDate.value),
                endDate: "",
                id: isEditEnabled ? id.value : new Date()
            }
        }
        else {
            // FIXME: Validation for Adding a start date, not adding end date
            // and hitting "Save" without "In Progress" where "Invalid Date" sits
            // on the endDate object. We need to validate that endDate has a value
            // if !inProgress

            experienceData = {
                companyName: companyName.value,
                positionTitle: positionTitle.value,
                positionDesc: experienceText.value,
                startDate: new Date(startDate.value),
                endDate: new Date(endDate.value),
                id: isEditEnabled ? id.value : new Date()
            }
        }
        emit('save-exp', experienceData)

        companyName.value = ""
        positionTitle.value = ""
        experienceText.value = ""
        startDate.value = ""
        endDate.value = ""
        isCurrentPosition.value = false
    }
}

onMounted(() => {
    if (isEditEnabled && props.startValues != undefined) {
        companyName.value = props.startValues.companyName
        positionTitle.value = props.startValues.positionTitle
        experienceText.value = props.startValues.positionDesc
        startDate.value = getStringDate(props.startValues.startDate)
        endDate.value = getStringDate(props.startValues.endDate)
        id.value = props.startValues.id
    }
    else {
        id.value = new Date()
    }
})

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
                    <v-btn v-if="props.startValues != null" @click="emitDeleteExp">Delete</v-btn>
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