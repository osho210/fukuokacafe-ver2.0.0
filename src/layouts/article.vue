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
                <li v-for="shopElement in shops" :key="shopElement.shop_name" class="fa-check__box">
                    <a :href="'#' + shopElement.shop_id">{{ shopElement.shop_name }}</a>
                </li>
            </ul>
        </div>
        <article>
            <h2 class="articleSubTitle">{{ articleSubTitle }}</h2>
            <ul>
                <li v-for="shopElement in shops" :key="shopElement.shop_name" class="shopArticle" :id="shopElement.shop_name">
                    <h2 class="shopTitle"> <b>{{ shopElement.shop_name }}</b></h2>
                    <h3 class="shopDescription">{{ shopElement.shop_slogan }}</h3>
                    <!-- もし複数画像を利用する場合はv-forを利用 -->
                    <img :src="images[0].image_url" alt="カフェ画像">

                    <!-- instagramImage -->
                    <div class="photgraferItem">
                        <img :src="images[0].image_url" alt="撮影者">
                        <div>
                            <p>Instgram<br>
                                {{ images[0].photographer_name }}</p>
                        </div>
                    </div>
                    <h4>
                        {{ shopElement.shop_description }}
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
                                    <!-- day_idで曜日を出して -->
                                    <p>営業時間 :
                                        <span v-for="day in shop_business_days" :key="day.shop_id">
                                            {{ day.business_hours_start }} +"~"+ {{ day.business_hours_end }}
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_dayoff.svg" alt="">
                                    <!-- 曜日を結合 -->
                                    <p>店休日 : {{ business_days[0].day_name }}</p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_phone.svg" alt="">
                                    <p>電話 : {{ shopElement.phone_number }}</p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_parking.svg" alt="">
                                    <p>駐車用 : {{ shopElement.parking_availability == true ? "あり" : "なし" }}</p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_access.svg" alt="">
                                    <p>アクセス : {{ shopElement.nearest_station }}</p>
                                </li>
                                <li>
                                    <img src="../assets/icons/sum_hp.svg" alt="">
                                    <a :href="shopElement.instagram_name" target="_blank">インスタグラムはこちら</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 店舗カード1 -->
                    <div v-if="shopElement.blog_card_status_and_type == 2">
                        <router-link :to="'../cafe/' + shopElement.blog_detail_path">
                            <div class="blogCard">
                                <div class="blogCardContent">
                                    <img class="blogCardPhoto" :src="shopElement.blog_card_image" alt="カフェ記事写真">
                                    <div class="blogCardText">
                                        <p class="cafeForBlogCard">{{ shopElement.shop_name }}</p>
                                        <p class="cafeForBlogCardDetails">{{ shopElement.shop_slogan }}</p>
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
const shops = ref<shops[]>(inject('shops', []))
const images = ref<images[]>(inject('images', []))
const business_days = ref<business_days[]>(inject('business_days', []))
const shop_business_days = ref<shop_business_days[]>(inject('shop_business_days', []))

</script>
<style scoped></style>
