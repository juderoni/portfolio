<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const resume = ref(null);

const fetchResume = async () => {
    try {
        const response = await axios.get("/api/resume");
        resume.value = response.data;
    } catch (error) {
        console.error("Error fetching resume:", error);
    }
};

onMounted(fetchResume);
</script>

<template>
    <div class="container" style="padding-top: 100px">
        <h1 v-if="resume">{{ resume.name }}</h1>
        <p v-if="resume">
            <strong>Email: </strong>
            <a :href="'mailto:' + resume.email">{{ resume.email }}</a>
        </p>
        <p v-if="resume">
            <strong>LinkedIn: </strong>
            <a :href="resume.linkedin" target="_blank">{{ resume.linkedin }}</a>
        </p>

        <h2>Education</h2>
        <p v-for="edu in resume?.education" :key="edu.institution">
            <strong>{{ edu.institution }}</strong> - {{ edu.degree }} ({{
                edu.graduation
            }})
        </p>

        <h2>Skills</h2>
        <p>{{ resume?.skills?.join(", ") }}</p>

        <h2>Work Experience</h2>
        <div v-for="job in resume?.work_experience" :key="job.title">
            <p>
                <strong>{{ job.title }} - {{ job.company }}</strong> ({{
                    job.date
                }})
            </p>
            <p>{{ job.description }}</p>
        </div>
    </div>
</template>
