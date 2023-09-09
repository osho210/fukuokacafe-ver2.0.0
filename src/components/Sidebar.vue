<template>
    <div class="sideItems contentSide">
        <ul>
            <li v-for="listItem in sideItemd" :key="listItem.name">
                <router-link :to="'../' + listItem.url" class="sideItem">
                    <p>{{ listItem.name }}</p>
                    <div>
                        <img src="../assets/icons/side-border.svg">
                        <img :src="listItem.path" alt="">
                    </div>
                </router-link>
            </li>
        </ul>
        <div class="hashTag">
            <h2>-#ハッシュタグ</h2>
            <!-- ここはdbから値を取得する -->
            <!-- <ul>
                <li v-for="tag in hashTag" :key="tag.id">
                    <p>#{{ tag.name }}</p>
                </li>
            </ul> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import sidePurposeIcon from '../assets/icons/side_purpose.svg'
import sideMenuIcon from '../assets/icons/side_menu.svg'
import sideAreaIcon from '../assets/icons/side_area.svg'
import sideCategoryIcon from '../assets/icons/side_category.svg'
import sideContactIcon from '../assets/img/icon/side_contact.svg'

const sideItemd: ReadonlyArray<NavItems> = [
    { name: '目的', url: 'purpose', path: sidePurposeIcon },
    { name: 'メニュー', url: 'menu', path: sideMenuIcon },
    { name: 'エリア', url: 'area', path: sideAreaIcon },
    {
        name: 'カテゴリー', url: 'category', path: sideCategoryIcon
    }
    // {name: '連絡先', url: 'contact', path: sideContactIcon}
]
</script>

<style scoped>
.sideItems {
    margin-left: 1vw;
    font-size: 1rem;
    padding: 0 2vw;
}

.sideItem {
    display: flex;
    background: #978574;
    color: white;
    margin-bottom: 1.5em;
    padding: 1em;
    border-radius: 15px;
    justify-content: space-between;
}

.sideItem div {
    display: flex;
    margin-right: 3rem;
}

.sidebarSelector {
    width: 100%;
    margin-bottom: 1.5em;
}

.sidebarSelector h2 {
    display: none;
}

.hashTag {
    background: #eee8e3;
    color: #4c3a2d;
    padding: 2em 0 1em 2em;
}

.hashTag h2 {
    padding-bottom: 0.5em;
    font-size: 1.5rem;
}

.hashTag li {
    margin-bottom: 1.5em;
}
</style>
