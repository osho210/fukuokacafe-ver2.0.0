<template>
    <div class="wrapper">
        <div class="diagnosis-container">
            <img class="diagnosis-image" src="../../assets/image/diagnosis/img_diagnosis_kv.svg" alt="アンケートkv">
            <router-link :to="currentRoute + '/question'">
                <button>
                    <span>診断を始める</span>
                </button>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home"
});

const route = useRoute()
let currentRoute = ref(route.path)


</script>

<style scoped>
.contentMain {
    padding: 0;
}

.wrapper {
    margin-top: 80px;
    padding: 0px;
    padding-bottom: 40px;
    background: #976d50;
}

.diagnosis-container {
    position: relative;
}

.diagnosis-image {
    width: 100%;
}

button {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #f22749;
    font-family: "Montserrat", sans-serif;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border: none;
}

button:hover::after {
    right: auto;
    left: 0;
    width: 100%;
}

button span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 18px 25px;
    color: #fff;
    font-size: 1.125em;
    font-weight: 700;
    letter-spacing: 0.3em;
    z-index: 20;
    transition: all 0.3s ease-in-out;
}
</style>