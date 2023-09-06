<template>
    <footer class='footerContent'>
        <ul class='footerContentElements'>
            <li v-for='footerItem in footerItems' :key='footerItem.name' :href='footerItem.url' class='footerContentElement'>
                <router-link :to="'../' + footerItem.url">
                    <img :src='footerItem.path' alt='フッタ' class='footerListImage'><br>
                    <p>{{ footerItem.name }}</p>
                </router-link>
            </li>
        </ul>
    </footer>
</template>
<script setup lang="ts">
import btmMenuIcon from '../assets/icons/btm_menu.svg'
import btmAreaIcon from '../assets/icons/btm_area.svg'
import btmCategoryIcon from '../assets/icons/btm_category.svg'
import btmPurposeIcon from '../assets/icons/btm_purpose.svg'

const footerItems: ReadonlyArray<NavItems> = [
    { name: 'メニュー', path: btmMenuIcon, url: 'menu' },
    { name: 'エリア', path: btmAreaIcon, url: 'area' },
    { name: 'ふんいき', path: btmCategoryIcon, url: 'category' },
    { name: 'もくてき', path: btmPurposeIcon, url: 'purpose' }
]
</script>
<style scoped>
.footerContent {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    height: 6em;
    z-index: 5;
    margin: 0px calc(50% - 50vw);
    width: 100vw;
}

.footerContentElements {
    display: flex;
}

.footerContentElement {
    width: 25%;
    text-align: center;
    padding: 1%;
}

.footerContentElement:nth-of-type(n+2) {
    border-left: 1px solid #000;
}

.footerContentElement img {
    width: 35%;
}

.footerContentElement p {
    margin-top: 5%;
    font-size: 80%;
}
</style>
