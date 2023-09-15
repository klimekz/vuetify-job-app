<script setup>
const props = defineProps(['appName', 'appEmail', 'appPhone', 'exp', 'edu', 'selfId', 'vetStatus']);
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
                                <p>{{ p.startDate.getMonth() }}/{{ p.startDate.getFullYear() }}</p>-<p>{{ p.endDate.getMonth()
                                }}/{{
        p.endDate.getFullYear() }}</p>
                        </div>
                </div>
                <h5 class="reviewElement"><a href="#educationInputBtn">Education</a></h5>
                <div v-for="e in props.edu">
                        <p>{{ e.degreeLevel }}, {{ e.major }} </p>
                        <p>{{ e.instName }}</p>
                        <div class="textRow">
                                <p>{{ e.startDate.getMonth() }}/{{ e.startDate.getFullYear() }}</p>-<p>{{ e.endDate.getMonth()
                                }}/{{
        e.endDate.getFullYear() }}</p>
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