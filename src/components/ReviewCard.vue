<script setup>
const props = defineProps(['appName', 'appEmail', 'appPhone', 'exp', 'edu', 'selfId', 'vetStatus']);

function formatDate(d) {
        if (d === '') {
                return false
        }
        else {
                return new Date(d).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        timeZone: 'UTC' // Specify the time zone as UTC
                })
        }
}

</script>
<template>
        <div class="startCol">
                <h3>Review</h3>
                <h5 class="reviewElement"><a href="#nameInput">Full Name</a></h5>
                <p>{{ props.appName }}</p>
                <h5 class="reviewElement"><a href="#emailInput">Email</a></h5>
                <p>{{ props.appEmail }}</p>
                <h5 class="reviewElement"><a href="#phoneInput">Phone Number</a></h5>
                <p>{{ props.appPhone }}</p>
                <h5 class="reviewElement"><a href="#workInputBtn">Work Experience</a></h5>
                <div v-for="p in props.exp" :key="p.startDate">
                        <p>{{ p.positionTitle }}, {{ p.companyName }}</p>
                        <div class="textRow">
                                <p>{{ formatDate(p.startDate) }}</p>-<p>{{ formatDate(p.endDate) ? formatDate(p.endDate) : "" }}
                                </p>
                        </div>
                </div>
                <h5 class="reviewElement"><a href="#educationInputBtn">Education</a></h5>
                <div v-for="e in props.edu">
                        <p>{{ e.degreeLevel }}, {{ e.major }} </p>
                        <p>{{ e.instName }}</p>
                        <div class="textRow">
                                <p>{{ formatDate(e.startDate) }}</p>-<p>{{ formatDate(e.endDate) ? formatDate(e.endDate) : "" }}
                                </p>
                        </div>
                </div>
                <h5 class="reviewElement"><a href="selfIdInput">Self Identification</a></h5>
                <p>{{ props.selfId }}</p>
                <h5 class="reviewElement"><a href="veteranStatusInput">Veteran Status</a></h5>
                <p>{{ props.vetStatus }}</p>
        </div>
</template>

<style scoped>
.reviewElement {
        margin-top: 1em;
        margin-bottom: .3em;
}
</style>