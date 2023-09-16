<template>
    <iframe class='instagram-media instagram-media-rendered instagram-iframe' :src="'https://www.instagram.com/p/' + src + '/embed'"></iframe>
</template>

<script setup lang="ts">
const props = defineProps<{
    src: string
}>()
</script>
<style scoped>
.instagram-iframe {
    background: white;
    max-width: 540px;
    width: calc(100% - 2px);
    border-radius: 3px;
    border: 1px solid rgb(219, 219, 219);
    box-shadow: none;
    display: block;
    margin: 0px auto 12px;
    min-width: 326px;
    padding: 0px;
    height: 400px;
}
</style>
