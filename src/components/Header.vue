<template>
    <header>
        <div :class="{ itemDistanceEvenly: isActive, headerPosition: isActive }">
            <router-link to="/">
                <img src="../assets/icons/logo.png" alt="サイトロゴ" :class="{ logoImage: isActive }">
            </router-link>
            <div :class="{ showMobile: showMobileActive, headerList: isActive, wrapper: isActive }">
                <ul :class="{ itemDistanceEvenly: isActive }">
                    <li v-for="(headerItem) in headerItems" :key="headerItem.name" :href="headerItem.url" :class="{ headerItemPosition: isActive }">
                        <router-link :to="'../' + headerItem.url">
                            {{ headerItem.name }}
                        </router-link>
                    </li>
                </ul>
            </div>
            <Humbeger :class="{ showPc: showPcActive }" />
        </div>
    </header>
</template>

<script setup lang="ts">
const headerItems: ReadonlyArray<HeaderItems> = [
    { name: '福岡カフェ日記とは', url: 'about' },
    { name: '目的', url: 'purpose' },
    { name: 'メニュー', url: 'menu' },
    { name: 'エリア', url: 'area' },
    { name: 'カテゴリー', url: 'category' },
    { name: 'お問い合わせ', url: 'contact' }
]

const isActive = ref(true)
const { showMobileActive, showPcActive } = defineProps<{
    showMobileActive: boolean
    showPcActive: boolean
}>()

</script>

<style scoped>
header {
    background: white;
    height: 80px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 10;
    width: 100%;
}

.headerList {
    margin: auto 0;
}

.headerList li a {
    font-size: 90%;
}

.headerPosition {
    background: white;
}

.logoImage {
    width: 200px;
}

.headerItemPosition {
    margin: 15px 10px;
}

/* mediaquery */
@media screen and (max-width: 550px) {
    .logoImage {
        position: fixed;
        top: 5px;
        left: 5px;
        width: 150px;
    }
}
</style>
