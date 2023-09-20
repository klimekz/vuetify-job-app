<script setup>
import { onMounted, ref } from 'vue';
import ExperienceModal from './ExperienceModal.vue';
import EducationModal from './EducationModal.vue'
import ApplicantEduCard from './ApplicantEduCard.vue';
import ApplicantExpCard from "./ApplicantExpCard.vue"
import ReviewCard from "./ReviewCard.vue"
import PositionInformation from './PositionInformation.vue';

const phonePattern = /^\d{10}$/
const vetStatusContent = ["We are dedicated to providing equal opportunities to all individuals, including veterans. Your veteran status is an important part of your background, and we value the skills and experiences that veterans bring to our organization.To support our commitment to diversity and inclusion, we encourage you to voluntarily disclose your veteran status in this section.", "This information is entirely optional and will be kept confidential.Your decision to provide or withhold this information will not impact your application in any way.We use this data solely for affirmative action reporting and to assess our efforts in creating an inclusive workplace.", "Please indicate your veteran status by selecting one of the following options:"]
const selfIdContent = ["We are proud to be an equal opportunity employer, dedicated to fostering diversity and inclusion within our workforce. Your unique background and experiences are essential to our success, and we invite you to voluntarily self-identify your demographic information.", "This information is strictly confidential and will be used for statistical purposes and diversity initiatives. Your decision to provide or withhold this information will not affect your application in any way. It will help us measure our progress and guide our efforts to build a workplace that reflects the diverse communities we serve.", "Please take a moment to provide this information. Your responses will be used only for internal purposes and will not be shared with hiring managers or influence hiring decisions."]

const expModal = ref(false);
const expModalContent = ref(false)
const eduModal = ref(false);
const eduModalContent = ref(false)
const workExp = ref([])
const eduExp = ref([])
const sectionsDisplayed = ref(0);
const currentExp = ref(null);
const currentEdu = ref(null);

const applicantName = ref("")
const applicantEmail = ref("")
const applicantPhone = ref("")
const selfIdStatement = ref("")
const vetStatus = ref("")

function toggleExpModal() {
    expModal.value = !expModal.value;
}

function expCardClick(position) {
    currentExp.value = position
    expModalContent.value = true
}

function eduCardClick(e) {
    currentEdu.value = e
    eduModalContent.value = true
}

function toggleEduModal() {
    eduModal.value = !eduModal.value;
}

function appendExp(d) {
    workExp.value.push(d);
    workExp.value.sort((a, b) => a.startDate - b.startDate)
    expModal.value = false;
}

function saveExp(d) {
    for (let i = 0; i < workExp.value.length; i++) {
        if (workExp.value[i].id - d.id == 0) {
            workExp.value[i] = d
            currentExp.value = null
            expModalContent.value = false
            return
        }

    }
    expModalContent.value = false
}

function saveEdu(d) {
    for (let i = 0; i < eduExp.value.length; i++) {
        if (eduExp.value[i].id - d.id == 0) {
            eduExp.value[i] = d
            currentEdu.value = null
            eduModalContent.value = false
            return
        } else {
        }
    }
    eduModalContent.value = false
}

function validateId() {
    if (applicantName.value != '' && applicantEmail.value.includes('@')
        && applicantEmail.value.includes('.') && applicantPhone.value != '' &&
        phonePattern.test(applicantPhone.value.replace(/-/g, '')))
        sectionsDisplayed.value += 1
}

function appendEdu(d) {
    eduExp.value.push(d);
    toggleEduModal();
}

function removeEdu(id) {
    const updatedList = eduExp.value.filter((e) => id != e.id)
    eduExp.value = updatedList
    eduModalContent.value = false
}

function removeExp(id) {
    const updatedList = workExp.value.filter((e) => id - e.id !== 0)
    workExp.value = updatedList;
    expModalContent.value = false
}

onMounted(() => {
    sectionsDisplayed.value = 1
})
</script>

<template>
    <div v-if="sectionsDisplayed == 0">
        <h3>Submitted.</h3>
        <p>If your qualifications align with the requirements of this position, our team will contact you for further
            correspondence.</p>
    </div>
    <div class="jobTitleText" v-if="sectionsDisplayed >= 1">
        <h2>Job Title</h2>
        <a href="">
            <h5>Company Name</h5>
        </a>
    </div>
    <br>
    <!-- Section 1: Identification -->
    <Transition>
        <div v-if="sectionsDisplayed >= 1">
            <form id="candidate-id" class="formContainer" @submit.prevent="validateId()">
                <div class="startCol">
                    <h3>Welcome.</h3>
                    <p>Please enter your contact information.</p>
                </div>
                <br />
                <v-text-field id="nameInput" v-model="applicantName" variant="solo" label="Full Name" placeholder="Name"
                    :rules="[(t) => { return t ? true : 'You must enter a name.' }]" />
                <v-text-field id="emailInput" v-model="applicantEmail" variant="solo" label="Email Address"
                    placeholder="abc@xyz.com" type="email"
                    :rules="[(t) => { return t && t.includes('@') && t.includes('.') ? true : 'You must enter a valid email address.' }]" />
                <v-text-field id="phoneInput" v-model="applicantPhone" variant="solo" label="Phone Number"
                    placeholder="111-111-1111" type="tel"
                    :rules="[(t) => { return phonePattern.test(t.replace(/-/g, '')) ? true : 'You must enter a valid phone number.' }]" />
                <br />
                <PositionInformation />
                <div class="centerContent">
                    <v-btn v-if="sectionsDisplayed == 1" color="primary" type="submit">Continue</v-btn>
                </div>
            </form>
        </div>
    </Transition>
    <!-- Section 2: Work & Education Experience, Resume/Cover/CV -->
    <div>
        <div v-if="sectionsDisplayed >= 2">
            <div class="startCol">
                <h3>Experience</h3>
                <p>Please enter your relevant work experience.</p>
            </div>
            <ApplicantExpCard v-for="p in workExp" :key="p.id" @click="expCardClick(p)" :companyName="p.companyName"
                :positionTitle="p.positionTitle" :desc="p.positionDesc" :startDate="p.startDate" :endDate="p.endDate" />
            <br>
            <div class="centerContent">
                <v-btn id="workInputBtn" @click="toggleExpModal" color="primary">Add Experience</v-btn>
                <ExperienceModal @save-exp="(d) => appendExp(d)" @cancel-exp="toggleExpModal" :modal="expModal" />
                <ExperienceModal v-if="expModalContent" @save-exp="(d) => saveExp(d)" @delete-exp="(id) => removeExp(id)"
                    @cancel-exp="expModalContent = false" :modal="expModalContent" :startValues="currentExp" />
            </div>
        </div>
        <br>
        <div v-if="sectionsDisplayed >= 2">
            <div class="startCol">
                <h3>Education</h3>
                <p>Please enter your relevant educational experience.</p>
            </div>
            <ApplicantEduCard v-for="e in eduExp" :key="e.id" @click="eduCardClick(e)" :instName="e.instName"
                :degreeLevel="e.degreeLevel" :major="e.major" :startDate="e.startDate" :endDate="e.endDate" />
            <br>
            <div class="centerContent">
                <v-btn id="educationInputBtn" @click="toggleEduModal" color="primary">Add Education</v-btn>
                <EducationModal @save-edu="(d) => appendEdu(d)" @cancel-edu="toggleEduModal" :modal="eduModal" />
                <EducationModal v-if="eduModalContent" @save-edu="(d) => saveEdu(d)" @delete-edu="(id) => removeEdu(id)"
                    @cancel-edu="eduModalContent = false" :modal="eduModalContent" :startValues="currentEdu" />
            </div>
            <br>
            <form @submit.prevent="sectionsDisplayed = sectionsDisplayed + 1">
                <div class="startCol">
                    <h3>Resume</h3>
                    <br>
                    <input id="resumeInput" type="file" />
                </div>
                <br>
                <div class="startCol">
                    <h3>Cover Letter/CV (Optional)</h3>
                    <br>
                    <input id="coverCVInput" type="file" />
                </div>
                <br><br>
                <div class="centerContent">
                    <v-btn v-if="sectionsDisplayed == 2" color="primary" type="submit">Continue</v-btn>
                </div>
            </form>
        </div>
        <br>
    </div>
    <!-- Section 3: Self Identification & Veteran Status -->
    <div>
        <!-- Self-identification -->
        <div class="startCol" v-if="sectionsDisplayed >= 3">
            <h3>Self-Identification (Optional)</h3>
            <p class="contentP" v-for="c in selfIdContent">{{ c }}</p>
        </div>
        <br>
        <v-form v-if="sectionsDisplayed >= 3">
            <v-textarea id="selfIdInput" v-model="selfIdStatement" variant="solo" />
        </v-form>
        <br>
        <!-- Veteran Status -->
        <div class="startCol" v-if="sectionsDisplayed >= 3">
            <h3>Veteran Status (Optional)</h3>
            <p class="contentP" v-for="c in vetStatusContent">{{ c }}</p>
        </div>
        <br>
        <v-select id="veteranStatusInput" v-model="vetStatus" label="Select" variant="solo" v-if="sectionsDisplayed >= 3"
            :items="['I am a veteran', 'I am not a veteran', ' I prefer not to disclose my veteran status']"></v-select>
        <br>
        <div class="centerContent" v-if="sectionsDisplayed == 3">
            <v-btn @click="sectionsDisplayed = sectionsDisplayed + 1" color="primary">Review</v-btn>
        </div>
    </div>
    <!-- Section 4: Review -->
    <div>
        <ReviewCard v-if="sectionsDisplayed >= 4" :appName="applicantName" :appEmail="applicantEmail"
            :appPhone="applicantPhone" :exp="workExp" :edu="eduExp" :selfId="selfIdStatement" :vetStatus="vetStatus" />
        <div class="centerContent" v-if="sectionsDisplayed == 4">
            <v-btn @click="sectionsDisplayed = 0" color="primary">Submit</v-btn>
        </div>
    </div>
</template>

<style scoped>
.contentP {
    margin-top: .3em;
    margin-bottom: .6em;
}

#resumeInput,
#coverCVInput {
    align-self: center;
}

.cardPositionTitle {
    padding-top: 0;
}

.centerContent {
    display: flex;
    justify-content: center;
    margin-left: 0;
}

.jobTitleText {
    text-align: center;
}

.spaceBetween {
    justify-content: space-between;
}

.v-enter-active {
    transition: opacity 1.3s ease;
}

.v-enter-leave {
    transition: opacity .67s ease;
}

.v-enter-from {
    opacity: 0;
}

p {
    padding-top: .3em;
    padding-bottom: .3em;
}

h3 {
    margin-bottom: .6em;
}

.horiz {
    flex-direction: row;
}
</style>
