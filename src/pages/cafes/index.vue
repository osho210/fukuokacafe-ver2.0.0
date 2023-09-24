<template>
    <div class="select-wrapper">
        <label class="selectbox-005">
            <select v-model="selectedOption" @change="handleSelectChange">
                <option value="displayAll">一覧を表示</option>
                <option value="displayOpenShops">現在営業しているお店を表示</option>
                <option value="displayTopReviews">口コミの高い順に表示</option>
                <!-- <option>現在地に近い順に探す</option> -->
            </select>
        </label>
    </div>
    <ul class="shopLists">
        <router-link :to="currentRoute + '/' + shop.shop_id" v-for="shop in shopList" :key="shop.shop_name" class="shopList">
            <li>
                <p class="shop-name">{{ shop.shop_name }}</p>
                <img :src='"/_nuxt//assets/image/article/shop/" + shop.shop_images[0].image_id[0].image_url'>
            </li>
        </router-link>
    </ul>
</template>
<script lang="ts" setup>
definePageMeta({
    layout: "default"
});

const selectedOption = ref('displayAll')

import { createClient } from '@supabase/supabase-js'
const $config = useRuntimeConfig()
const supabaseUrl = $config.public.VITE_SUPABASE_URL
const supabaseApiKey = $config.public.VITE_SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseApiKey)
const shopList = ref<shopList>(inject('shopList', {} as shopList))
const route = useRoute()
let currentRoute = ref(route.path)


// 現在営業している店舗を表示
async function displayCurrentlyOpenShops(): Promise<void> {
    const day = new Date().getDay()
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    let nowTime = hour + ":" + minutes + ":00"
    const response = await supabase.from('shops')
        // 内部結合で画像を取得
        .select(`shop_id,shop_name, shop_images!inner(image_id!inner(image_url)), shop_business_days!inner(day_id,business_hours_start,business_hours_end)`)
        .eq('shop_business_days.day_id', day)
        .eq('shop_business_days.is_closed', false)
        .lte('shop_business_days.business_hours_start', nowTime)
        .gte('shop_business_days.business_hours_end', nowTime)

    const data = response.data as shopList
    shopList.value = data
}

async function displayAllShops(): Promise<void> {
    const response = await supabase.from('shops')
        // 内部結合で画像を取得
        .select(`shop_id,shop_name, shop_images!inner(image_id!inner(image_url))`)
    const data = response.data as shopList
    shopList.value = data
}

async function displayShopsByTopReviews(): Promise<void> {
    const response = await supabase.from('shops')
        // 内部結合で画像を取得
        .select(`shop_id,shop_name, star_rating,shop_images!inner(image_id!inner(image_url))`)
        .order('star_rating', { ascending: false })

    const data = response.data as shopList
    shopList.value = data
}

function handleSelectChange() {
    switch (selectedOption.value) {
        case 'displayAll':
            displayAllShops();
            break;
        case 'displayOpenShops':
            displayCurrentlyOpenShops();
            break;
        case 'displayTopReviews':
            displayShopsByTopReviews();
            break;
        default:
            console.log('未定義のオプション');
    }
}


onMounted(() => {
    displayAllShops()
})
</script>
<style scoped>
.shopLists {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
    row-gap: 40px;
}

.shopList {
    position: relative;
    display: flex;
    align-items: flex-end;
}

.shop-name {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    font-weight: bold;
    background: white;
}

.select-wrapper {
    text-align: center;
    margin-bottom: 20px;
}

.selectbox-005 {
    display: inline-flex;
    align-items: center;
    position: relative;
}

.selectbox-005::after {
    position: absolute;
    right: 15px;
    width: 10px;
    height: 7px;
    background-color: #535353;
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    content: '';
    pointer-events: none;
}

.selectbox-005 select {
    appearance: none;
    height: 2.8em;
    padding: .4em calc(.8em + 30px) .4em .8em;
    border: none;
    border-bottom: 2px solid #b58769;
    background-color: #fff;
    color: #333333;
    font-size: 1em;
    cursor: pointer;
}

.selectbox-005 select:focus {
    outline: none;
}

.shopList img {
    width: 100%;
}

@media screen and (min-width: 1024px) {
    .shopLists {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 20px;
        row-gap: 50px;
    }
}
</style>