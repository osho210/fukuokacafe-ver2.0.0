<template>
    <!-- 取材に行って記事コンテンツがある場合 -->
    <h1 class="shopName">{{ shops.shop_name }}</h1>
    <div v-if="images">
        <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="1" :loop="true" :autoplay="{ delay: 8000, disableOnInteraction: true, }" class='sliderItems'>
            <SwiperSlide v-for='(sliderItemImage) in sliderItemImages' :key='sliderItemImage.images.image_url'>
                <!-- 理想は相対パス -->
                <div class='sliderItemImage'>
                    <img :src='"/_nuxt//assets/image/article/shop/" + sliderItemImage.images.image_url' alt='スライド画像'>
                    <router-link :to='"https://www.instagram.com/" + sliderItemImage.images.photographer_name' target="_blank">
                        <div class="sliderItemUsers-container">
                            <p class="sliderItemUsers--title">撮影者</p>
                            <img class="sliderItemUsers--img" :src='"/_nuxt//assets/image/article/users/" + sliderItemImage.images.photographer_icon' alt='スライド画像'>
                            <p class="sliderItemUsers--text">{{ sliderItemImage.images.photographer_name }}</p>
                        </div>
                    </router-link>
                </div>
            </SwiperSlide>
        </Swiper>
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
                        <ul class="recommentLists">
                            <li>{{ shops.recomend1 }}</li>
                            <li>{{ shops.recomend2 }}</li>
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
                                <img src="../../assets/icons/sum_address.svg" alt="">
                                <p>住所 : {{ shops.address }}</p>
                            </li>
                            <li>
                                <img src="../../assets/icons/sum_hour.svg" alt="">
                                <!-- day_idで曜日を出して -->
                                <p>営業時間 :
                                    <span v-if=shop_business_days.is_closed>
                                        本日は定休日です
                                    </span>
                                    <span v-else>
                                        {{ shop_business_days.business_hours_start }} ~ {{ shop_business_days.business_hours_end }}
                                    </span>
                                </p>
                            </li>
                            <li>
                                <img src="../../assets/icons/sum_dayoff.svg" alt="">
                                <!-- 曜日を結合 -->
                                <p>店休日 :
                                    <span v-if="!dayNames || Object.keys(dayNames).length === 0">不定休</span>

                                    <!-- dayNamesに要素が存在する場合 -->
                                    <span v-else v-for="day in dayNames" :key="day">
                                        {{ day }}
                                    </span>
                                </p>
                            </li>
                            <li>
                                <img src="../../assets/icons/sum_phone.svg" alt="">
                                <p>電話 : {{ shops.phone_number }}</p>
                            </li>
                            <li>
                                <img src="../../assets/icons/sum_parking.svg" alt="">
                                <p>駐車場 : {{ shops.parking_availability == true ? "あり" : "なし" }}</p>
                            </li>
                            <li>
                                <img src="../../assets/icons/sum_access.svg" alt="">
                                <p>アクセス : {{ shops.nearest_station }}</p>
                            </li>
                            <li>
                                <img src="../../assets/icons/sum_hp.svg" alt="">
                                <a v-if="shops.instagram_name" :href="'https://www.instagram.com/' + shops.instagram_name" target="_blank">インスタグラムはこちら</a>
                                <p v-else>インスタグラムはありません</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--hashtag  @click="scrollToTarget"を未定義-->
        <div v-if='localSelectedItemId === 4' class='hashtag shopDetailText'>
            <ul ref="instagramEmbed">
                <li v-for='insta in instagramUrl' :key='insta.embed_name'>
                    <InstagramIframe :src='insta.embed_name' :dataInstgrmPayloadId="'dataInstgrmPayloadId' + insta.embed_id" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    layout: "default"
});

import { createClient } from '@supabase/supabase-js'
const $config = useRuntimeConfig()
const supabaseUrl = $config.public.VITE_SUPABASE_URL
const supabaseApiKey = $config.public.VITE_SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseApiKey)

const route = useRoute()
const shopId = route.params.id

// spubase
const shops = ref<shops>(inject('shops', {} as shops))
const images = ref<images>(inject('images', {} as images))
const dayNames = ref<business_days>(inject('business_days', {} as business_days))
const shop_business_days = ref<shop_business_days>(inject('shop_business_days', {} as shop_business_days))
const sliderItemImages = ref<sliderItemImages>(inject('sliderItemImages', {} as sliderItemImages))
const instagramUrl = ref<instgramEmbed>(inject('instgramEmbed', {} as instgramEmbed))

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

// 店舗の取得
async function getShop() {
    const { data } = await supabase.from('shops').select().eq('shop_id', shopId)
    shops.value = data ? data[0] : [] as shops[]
}

// 定休日の取得
async function getCLosed(): Promise<void> {
    const response = await supabase
        .from('shop_business_days')
        .select(`business_days!inner(day_name)`)
        .eq('shop_id', shopId)
        .eq('is_closed', true)

    const data: BusinessCloseDay[] | any = response.data;
    dayNames.value = data?.map((item: BusinessCloseDay) => item.business_days.day_name) || [];
}

// 営業時刻の取得
async function businessTime(): Promise<void> {
    const day = new Date().getDay()
    const response = await supabase
        .from('shop_business_days')
        .select(`business_hours_start,business_hours_end,is_closed`)
        .eq('shop_id', shopId)
        .eq('day_id', day)
    const data: BusinessDay[] | any = response.data
    // 当日が営業日の場合実行
    if (!data[0].is_closed) {
        data[0].business_hours_start = data[0].business_hours_start.substring(0, 5)
        data[0].business_hours_end = data[0].business_hours_end.substring(0, 5)
    }
    shop_business_days.value = data[0]
}

// 店舗写真の取得
async function getShopImages(): Promise<void> {
    const response = await supabase
        .from('shop_images')
        .select(`images!inner(image_url,photographer_icon,photographer_name),shops!inner(shop_name)`)
        .eq('shop_id', shopId)

    const data: sliderItemImages[] | any = response.data;
    sliderItemImages.value = data
}

// 埋め込みembedを取得
async function getInstagramEmbeds(): Promise<void> {
    const response = await supabase
        .from('embeds')
        .select("embed_name,embed_id")
        .eq('shop_id', shopId)
    const data: instgramEmbed[] | any = response.data;
    instagramUrl.value = data
    console.log(instagramUrl.value)
}

onMounted(() => {
    getShop()
    getCLosed()
    businessTime()
    getShopImages()
    getInstagramEmbeds()
})
</script>

<style scoped>
.shopName {
    text-align: center;
}

.recommentLists li::before {
    content: '・';
    position: absolute;
    left: 0px;

}

.recommentLists li {
    margin-left: 10px;
    position: relative;
}
</style>
