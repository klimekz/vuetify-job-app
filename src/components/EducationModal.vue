<script setup>
import { computed, onMounted, ref } from 'vue';
import universities from "../data/uni_list.json"
const props = defineProps(['modal', 'startValues']);
const instName = ref("");
const degreeLevel = ref("");
const major = ref("")
const startDate = ref(undefined)
const endDate = ref(undefined)
const inProgress = ref(false);
const instNotListed = ref(false);
const id = ref("")
const educationOptions = ["High School Diploma or Equivalent", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral Degree", "Certification/Bootcamp Experience"];
const usUniOptions = universities.Universities
const emit = defineEmits()

const isEditEnabled = computed(() => props.modal)

function emitCancelEdu() {
    emit('cancel-edu', null);
}

function getStringDate(d) {
    if (d == "") {
        inProgress.value = true;
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

function emitSaveEdu() {
    if (instName.value != '' && degreeLevel.value != '' && startDate.value != '') {
        let educationData = undefined
        if (inProgress.value) {
            educationData = {
                instName: instName.value,
                degreeLevel: degreeLevel.value,
                major: major.value,
                startDate: new Date(startDate.value),
                endDate: "",
                id: isEditEnabled.value ? id.value : new Date()
            }
        }
        else {
            educationData = {
                instName: instName.value,
                degreeLevel: degreeLevel.value,
                major: major.value,
                startDate: new Date(startDate.value),
                endDate: new Date(endDate.value),
                id: isEditEnabled.value ? id.value : new Date()
            }
        }

        emit('save-edu', educationData)
    }
}

onMounted(() => {
    if (isEditEnabled && props.startValues != undefined) {
        instName.value = props.startValues.instName
        degreeLevel.value = props.startValues.degreeLevel
        major.value = props.startValues.major
        startDate.value = getStringDate(props.startValues.startDate)
        endDate.value = getStringDate(props.startValues.endDate)
        id.value = props.startValues.id
        instNotListed.value = !usUniOptions.some(u => u === props.startValues.instName) ? true : false;
    }
})

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
                    <v-checkbox @change="instName = ''" v-model="instNotListed" label="Institution Not Listed"></v-checkbox>
                </div>
                <v-card-actions>
                    <v-btn type="submit" color="primary">Save</v-btn>
                    <v-btn @click="emitCancelEdu">Cancel</v-btn>
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

