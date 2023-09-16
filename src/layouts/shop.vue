<template>
    <h1 class="shopName">{{ shops.shop_name }}</h1>
    <div class='content'>
        <section class='contentMain'>
            <!-- 取材に行って記事コンテンツがある場合 -->
            <div v-if="images">
                <!-- <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="3" :loop="true" :autoplay="{ delay: 8000, disableOnInteraction: true, }" class='sliderItems'>
                    <SwiperSlide v-for='sliderItemImage in sliderItemImages' :key='sliderItemImage.name'>
                        <div class='sliderItemImage'>
                            <router-link :to="'../' + sliderItemImage.url">
                                <img :src='sliderItemImage.path' alt='スライド画像'>
                            </router-link>
                        </div>
                    </SwiperSlide>
                </Swiper> -->
            </div>
            <div class='shopDetail'>
                <ul class='shopDetailList'>
                    <li v-for='shoplist in shopDetailLists' :key='shoplist.id' @click='selectItem(shoplist.id)' :class='{ active: localSelectedItemId === shoplist.id }'>
                        {{ shoplist.title }}
                    </li>
                </ul>
                <div>
                    <div v-if='localSelectedItemId === 1' class='shopDetailText'>
                        {{ shops.shop_description }}
                    </div>
                    <div v-if='localSelectedItemId === 2'>
                        <!-- recommend -->
                        <div class='recommendPerson'>
                            <p>こんな方におすすめ</p>
                            <div class='recommendPersonContent'>
                                <ul>
                                    <li>・{{ shops.recomend1 }}</li>
                                    <li>・{{ shops.recomend2 }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- shopInformation -->
                    <div v-if='localSelectedItemId === 3'>
                        <div class='storeInfo'>
                            <p>店舗情報</p>
                            <div class='storeInfoDetail'>
                                <ul>
                                    <li>
                                        <img src="../assets/icons/sum_address.svg" alt="">
                                        <p>住所 : {{ shops.address }}</p>
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
                                        <p>店休日 :
                                            <span v-for="day in dayNames" :key="day">
                                                {{ day }}
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <img src="../assets/icons/sum_phone.svg" alt="">
                                        <p>電話 : {{ shops.phone_number }}</p>
                                    </li>
                                    <li>
                                        <img src="../assets/icons/sum_parking.svg" alt="">
                                        <p>駐車場 : {{ shops.parking_availability == true ? "あり" : "なし" }}</p>
                                    </li>
                                    <li>
                                        <img src="../assets/icons/sum_access.svg" alt="">
                                        <p>アクセス : {{ shops.nearest_station }}</p>
                                    </li>
                                    <li>
                                        <img src="../assets/icons/sum_hp.svg" alt="">
                                        <a :href="shops.instagram_name" target="_blank">インスタグラムはこちら</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!--hashtag  @click="scrollToTarget"を未定義-->
                <div v-if='localSelectedItemId === 4' class='hashtag shopDetailText'>
                    <!-- <ul ref="instagramEmbed">
                        <li v-for='insta in instagramUrl' :key='insta.name'>
                            <InstagramIframe :src='insta.src' :dataInstgrmPayloadId="'dataInstgrmPayloadId' + insta.name">
                            </InstagramIframe>
                        </li>
                    </ul> -->
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
const $config = useRuntimeConfig()
const supabaseUrl = $config.public.VITE_SUPABASE_URL
const supabaseApiKey = $config.public.VITE_SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseApiKey)

// spubase
const shops = ref<shops>(inject('shops', {} as shops))
const images = ref<images>(inject('images', {} as images))
const dayNames = ref<business_days>(inject('business_days', {} as business_days))
const shop_business_days = ref<shop_business_days>(inject('shop_business_days', {} as shop_business_days))
const instagramUrl = ref<instagramUrl>(inject('instagramUrl', {} as instagramUrl))
const shopDetailLists: ReadonlyArray<articleDetail> = [
    { id: 1, title: '店舗詳細' },
    { id: 2, title: 'おすすめな人' },
    { id: 3, title: '店舗情報' },
    { id: 4, title: 'インスタ' }
]
let localSelectedItemId = ref(1)
const selectItem = (selectVal: number) => {
    localSelectedItemId.value = selectVal
}

const swiperOptions = ref({
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
})

// const scrollToTarget = () => {
//     const targetOffset = this.$refs.instagramEmbed.offsetTop
//     window.scrollTo({
//         top: targetOffset,
//         behavior: 'smooth'
//     })
// }

type BusinessDayDetail = {
    day_name: string;
};

type BusinessDay = {
    business_days: BusinessDayDetail[];
};

// 店舗の取得
async function getShop() {
    const { data } = await supabase.from('shops').select().eq('shop_id', 1)
    shops.value = data ? data[0] : [] as shops[]
}
// 定休日の取得
async function getCLosed() {
    const resoponse = await supabase
        .from('shop_business_days')
        .select(`business_days!inner(day_name)`)
        .eq('shop_id', 1)
        .eq('is_closed', true)

    const data: BusinessDay[] | null = resoponse.data;
    dayNames.value = data?.map(item => item.business_days.day_name) || [];
}

// 営業時刻の取得
async function business_time() {
    const resoponse = await supabase
        .from('shop_business_days')
        .select(`business_hours_start`)
        .eq('shop_id', 1)
        .eq('is_closed', false)

    const data: BusinessDay[] | null = resoponse.data
    shop_business_days.value = data?.map(item => item.business_days.business_hours_start) || [];
    console.log(shop_business_days)
}

onMounted(() => {
    getShop()
    getCLosed()
    business_time()
})
</script>

<style scoped>
.shopName {
    text-align: center;
}
</style>

