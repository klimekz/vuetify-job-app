<script setup>
import { onMounted, ref } from 'vue';
import ExperienceModal from './ExperienceModal.vue';
import EducationModal from './EducationModal.vue'
import PositionInformation from './PositionInformation.vue'
import ApplicantExpCard from './ApplicantExpCard.vue';
import ApplicantEduCard from './ApplicantEduCard.vue';

const FAKE_POSITION = {
    companyName: "Target",
    positionTitle: "Marketing Director",
    startDate: new Date(2021, 5),
    endDate: new Date(2022, 10),
    positionDesc: "Consulted consumer data to guide seasonal campaign strategy and direction, Prepared and designed decks for marketing division's showcase for the C-suite."
}

const FAKE_SCHOOLING = {
    instName: "Grand Valley State University",
    degreeLevel: "Bachelor's Degree",
    major: "Computer Science",
    startDate: new Date(2018, 8),
    endDate: new Date(2023, 4),
}

const expModal = ref(false);
const eduModal = ref(false);
const workExp = ref([FAKE_POSITION])
const eduExp = ref([FAKE_SCHOOLING])
const sectionsDisplayed = ref(0);
const applicantName = ref("")
const applicantEmail = ref("")
const applicantCell = ref("")

function toggleExpModal() {
    expModal.value = true;
}

function setExpFalse() {
    expModal.value = false
}

function setEduFalse() {
    eduModal.value = false
}

function toggleEduModal() {
    eduModal.value = true;
}

function appendExp(d) {
    workExp.value.push(d);
    setExpFalse();
}

function appendEdu(d) {
    eduExp.value.push(d);
    setEduFalse();
}

onMounted(() => {
    sectionsDisplayed.value = 1
})
</script>

<template>
    <div v-if="sectionsDisplayed == 0">
        <h3>Submitted.</h3>
        <p>Insert message pertaining to response time.</p>
    </div>
    <div class="jobTitleText" v-if="sectionsDisplayed >= 1">
        <h2>Job Title</h2>
        <a href="">
            <h5>Company Name</h5>
        </a>
    </div>
    <br>
    <!-- Section 1 -->
    <Transition>
        <div v-if="sectionsDisplayed >= 1">
            <div id="candidate-id" class="formContainer">
                <div class="startCol">
                    <h3>Welcome.</h3>
                    <p>Please enter your contact information.</p>
                </div>
                <br />
                <v-form>
                    <v-text-field v-model="applicantName" variant="solo" label="Full Name" placeholder="Name" />
                </v-form>
                <v-form>
                    <v-text-field v-model="applicantEmail" variant="solo" label="Email Address" placeholder="abc@xyz.com"
                        type="email" />
                </v-form>
                <v-form>
                    <v-text-field v-model="applicantCell" variant="solo" label="Phone Number" placeholder="111-111-1111"
                        type="tel" />
                </v-form>
            </div>
            <PositionInformation />
            <br />
            <div class="centerContent">
                <v-btn v-if="sectionsDisplayed == 1" color="primary"
                    @click="sectionsDisplayed = sectionsDisplayed + 1">Continue</v-btn>
            </div>
        </div>
    </Transition>
    <!-- Section 2 Work & Education Experience, Resume-->
    <div>
        <div v-if="sectionsDisplayed >= 2">
            <div class="startCol">
                <h3>Experience</h3>
                <p>Please enter your relevant work experience.</p>
            </div>
            <ApplicantExpCard v-for="p in workExp" :key="p.companyName" :companyName="p.companyName"
                :positionTitle="p.positionTitle" :desc="p.positionDesc" :startDate="p.startDate" :endDate="p.endDate" />
            <br>
            <div class="centerContent">
                <v-btn @click="toggleExpModal" color="primary">Add Experience</v-btn>
                <ExperienceModal @save-exp="(d) => appendExp(d)" @cancel-exp="setExpFalse" :modal="expModal" />
            </div>
        </div>
        <br>
        <div v-if="sectionsDisplayed >= 2">
            <div class="startCol">
                <h3>Education</h3>
                <p>Please enter your relevant educational experience.</p>
            </div>
            <ApplicantEduCard v-for="e in eduExp" :key="e.startDate" :instName="e.instName" :degreeLevel="e.degreeLevel"
                :major="e.major" :startDate="e.startDate" :endDate="e.endDate" />
            <br>
            <div class="centerContent">
                <v-btn @click="toggleEduModal" color="primary">Add Education</v-btn>
                <EducationModal @save-edu="(d) => appendEdu(d)" @cancel-edu="setEduFalse" :modal="eduModal" />
            </div>
            <br>
            <div class="startCol">
                <h3>Resume</h3>
                <div><input type="file" /></div>
            </div>
            <br>
            <div class="startCol">
                <h3>Cover Letter/CV (Optional)</h3>
                <div><input type="file" /></div>
            </div>
        </div>
        <br>
        <div class="centerContent">
            <v-btn v-if="sectionsDisplayed == 2" color="primary"
                @click="sectionsDisplayed = sectionsDisplayed + 1">Continue</v-btn>
        </div>
        <br>
    </div>
    <!-- Section 3: Self Identification & Veteran Status -->
    <div>
        <!-- Self-identification -->
        <div class="startCol" v-if="sectionsDisplayed >= 3">
            <h3>Self-Identification (Optional)</h3>
            <p>We are proud to be an equal opportunity employer, dedicated to fostering diversity and inclusion within
                our workforce. Your unique background and experiences are essential to our success, and we invite you to
                voluntarily self-identify your demographic information.</p>
            <p>This information is strictly confidential and will be used for statistical purposes and diversity
                initiatives. Your decision to provide or withhold this information will not affect your application in
                any way. It will help us measure our progress and guide our efforts to build a workplace that reflects
                the diverse communities we serve.</p>
            <p>Please take a moment to provide this information. Your responses will be used only for internal purposes
                and will not be shared with hiring managers or influence hiring decisions.</p>
        </div>
        <br>
        <v-form v-if="sectionsDisplayed >= 3">
            <v-textarea variant="solo" />
        </v-form>
        <br>
        <!-- Veteran Status -->
        <div class="startCol" v-if="sectionsDisplayed >= 3">
            <h3>Veteran Status (Optional)</h3>
            <p>We are dedicated to providing equal opportunities to all individuals, including veterans. Your veteran
                status is an important part of your background, and we value the skills and experiences that veterans
                bring to our organization. To support our commitment to diversity and inclusion, we encourage you to
                voluntarily disclose your veteran status in this section.</p>
            <p>This information is entirely optional and will be kept confidential. Your decision to provide or withhold
                this information will not impact your application in any way. We use this data solely for affirmative
                action reporting and to assess our efforts in creating an inclusive workplace.</p>
            <p>Please indicate your veteran status by selecting one of the following options:</p>
        </div>
        <br>
        <v-select label="Select" variant="solo" v-if="sectionsDisplayed >= 3"
            :items="['I am a veteran', 'I am not a veteran', ' I prefer not to disclose my veteran status']"></v-select>
        <br>
        <div class="centerContent" v-if="sectionsDisplayed == 3">
            <v-btn @click="sectionsDisplayed = 4" color="primary">Review</v-btn>
        </div>
        <div class="startCol" v-if="sectionsDisplayed >= 4">
            <h3>Review</h3>
            <h5>Full Name</h5>
            <p>{{ applicantName }}</p>
            <h5>Email</h5>
            <p>{{ applicantEmail }}</p>
            <h5>Phone Number</h5>
            <p>{{ applicantCell }}</p>
            <br>
            <h5>Work Experience</h5>
            <div v-for="p in workExp">
                <p>{{ p.positionTitle }}, {{ p.companyName }}</p>
                <div class="textRow">
                    <p>{{ p.startDate.getMonth() }}/{{ p.startDate.getFullYear() }}</p>-<p>{{ p.endDate.getMonth() }}/{{
                        p.endDate.getFullYear() }}</p>
                </div>
            </div>
            <br>
            <h5>Education</h5>
            <div v-for="e in eduExp">
                <p>{{ e.degreeLevel }}, {{ e.major }} </p>
                <p>{{ e.instName }}</p>
                <div class="textRow">
                    <p>{{ e.startDate.getMonth() }}/{{ e.startDate.getFullYear() }}</p>-<p>{{ e.endDate.getMonth() }}/{{
                        e.endDate.getFullYear() }}</p>
                </div>
            </div>
            <br>
        </div>
        <div class="centerContent" v-if="sectionsDisplayed == 4">
            <v-btn @click="sectionsDisplayed = 0" color="primary">Submit</v-btn>
        </div>
    </div>
</template>

<style scoped>
.textRow {
    display: flex;
    flex-direction: row;
    align-items: center;
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

.formContainer {
    margin-bottom: 3vh;
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
