<template>
    <div class="wrapper">
        <section class="aboutItems">
            <div v-for="aboutItem in aboutItems" :key="aboutItem.title" class="aboutItem">
                <img :src="aboutItem.path" alt="紹介画像">
                <div>
                    <h2>{{ aboutItem.title }}</h2>
                    <p>{{ aboutItem.description }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import Area from '../assets/image/shared/intro_1.png'
import Media from '../assets/image/shared/intro_2.png'
import Food from '../assets/image/shared/intro_3.png'

interface aboutItems {
    title: string
    description: string
    path: string
}

const aboutItems: ReadonlyArray<aboutItems> = [
    {
        title: '福岡カフェをもっと身近に',
        description: '福岡には魅力的なお店が多い。シャレなお店、雰囲気の良いお店、カフェの魅力は様々。自分好みのカフェ探しの旅へ、さあ出かけよう。',
        path: Area
    },
    {
        title: '物語のようなSNSマガジン',
        description: '福岡のカフェをキュレーションしたメディア、福岡カフェ巡り。みなさまの好きが詰まったお店を紹介しています。ページをめくるように覗いていただけると嬉しいです。',
        path: Media
    },
    {
        title: 'ばりよか！福岡',
        description: '福岡には魅力的なお店がたくさん！どこ行く？どこ寄る？心からワクワクするお店を紹介しています。あなたはこのお店知っとると？',
        path: Food
    }
]
</script>
<style scoped>
.aboutItems {
    text-align: center;
}

.aboutItem {
    margin-bottom: 40px;
    margin: 0 10% 10% 10%;
    display: flex;
}

.aboutItem div {
    margin: auto 0 auto 10%;
    text-align: left;
}

.aboutItem:nth-child(2) {
    flex-direction: row-reverse;
}

.aboutItem:nth-child(2) div {
    margin: auto 10% auto 0;
}

.aboutItem img {
    width: 30%;
}

.aboutItem h2 {
    margin-top: 20px;
}

@media screen and (max-width: 550px) {
    .aboutItem {
        display: block;
        margin: 0;
        margin-bottom: 15%;
    }

    .aboutItem img {
        width: 70%;
    }

    .aboutItem div {
        margin: 0;
        text-align: center;
        display: inline-block;
    }

    .aboutItem:nth-child(2) div {
        margin: 0;
    }
}
</style>
