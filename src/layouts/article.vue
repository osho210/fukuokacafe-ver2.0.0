<template>
    <section>
        <div class="articleTitle">
            <h1><b>{{ articleTitle }}</b></h1>
            <img :src='articleImage'>
            <p>{{ articleTitleDescription }}</p>
        </div>
        <div class="nomadList10">
            <span>
                <i class="fas fa-check"></i> 目次
            </span>
            <ul class="fa-check__list">
                <li v-for="shopElement in shopElements" :key="shopElement.shopName" class="fa-check__box">
                    <a :href="'#' + shopElement.id">{{ shopElement.shopName }}</a>
                </li>
            </ul>
        </div>
        <article>
            <h2 class="articleSubTitle">{{ articleSubTitle }}</h2>
            <ul>
                <li v-for="shopElement in shopElements" :key="shopElement.shopName" class="shopArticle" :id="shopElement.shopName">
                    <h2 class="shopTitle"> <b>{{ shopElement.shopName }}</b></h2>
                    <h3 class="shopDescription">{{ shopElement.shopSlogan }}</h3>
                    <img :src="shopElement.shopImage" alt="カフェ画像">

                    <!-- instagramImage -->
                    <div class="photgraferItem">
                        <img :src="shopElement.photographer" alt="撮影者">
                        <div>
                            <p>Instgram<br>
                                {{ shopElement.photographerId }}</p>
                        </div>
                    </div>
                    <h4>
                        {{ shopElement.shopDescription }}
                    </h4>

                    <!-- recommend -->
                    <div class="recommendPerson">
                        <p>こんな方におすすめ</p>
                        <div class="recommendPersonContent">
                            <ul>
                                <li>・{{ shopElement.recomend1 }}</li>
                                <li>・{{ shopElement.recomend2 }}</li>
                            </ul>
                        </div>
                    </div>

                    <!-- shopInformation -->
                    <div class="storeInfo">
                        <p>店舗情報</p>
                        <div class="storeInfoDetail">
                            <ul>
                                <li>
                                    <img src="../assets/icons/sum_address.svg" alt="">
                                    <p>住所 : {{ shopElement.address }}</p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_hour.svg" alt="">
                                    <p>営業時間 : {{ shopElement.businessHoursStart + '' }}</p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_dayoff.svg" alt="">
                                    <p>店休日 : {{ shopElement.regularHoliday }}</p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_phone.svg" alt="">
                                    <p>電話 : {{ shopElement.phoneNumber }}</p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_parking.svg" alt="">
                                    <p>駐車用 : {{ shopElement.parkingAvailability }}</p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_access.svg" alt="">
                                    <p>アクセス : {{ shopElement.nearestStation }}</p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_hp.svg" alt="">
                                    <a :href="shopElement.hp" target="_blank">ホームページはこちら</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 店舗カード1 -->
                    <div v-if="shopElement.blogCardStatusAndType == 2">
                        <router-link :to="'../cafe/' + shopElement.blogDetailPath">
                            <div class="blogCard">
                                <div class="blogCardContent">
                                    <img class="blogCardPhoto" :src="shopElement.blogCardImage" alt="カフェ記事写真">
                                    <div class="blogCardText">
                                        <p class="cafeForBlogCard">{{ shopElement.shopName }}</p>
                                        <p class="cafeForBlogCardDetails">{{ shopElement.shopSlogan }}</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </li>
            </ul>
            <!-- articleSummary -->
            <div class="articleSummary">
                <h2 class="articleSubTitle">まとめ</h2>
                <p>{{ articleSummary }}</p>
            </div>
        </article>
    </section>
</template>

<script setup lang="ts">
// propsで値の受け取り
const articleTitle = ref<string>(inject('articleTitle', ''))
const articleSubTitle = ref<string>(inject('articleSubTitle', ''))
const articleImage = ref<string>(inject('articleImage', ''))
const articleTitleDescription = ref<string>(inject('articleTitleDescription', ''))
const articleSummary = ref<string>(inject('articleSummary', ''))
const shopElements = ref<article[]>(inject('shopElements', []))

</script>
<style scoped></style>
