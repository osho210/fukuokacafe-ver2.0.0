<template>
    <div>
        <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="3" :loop="true"  :autoplay="{ delay: 8000, disableOnInteraction: true, }" class='sliderItems'>
            <SwiperSlide v-for='sliderItemImage in sliderItemImages' :key='sliderItemImage.name'>
                <div class='sliderItemImage'>
                    <router-link :to="'../' + sliderItemImage.url">
                        <img :src='sliderItemImage.path' alt='スライド画像'>
                    </router-link>
                </div>
            </SwiperSlide>
        </Swiper>
        <div class="headerItemButtunArea">
            <ul class='headerItemButtuns'>
                <router-link :to="'../' + headerItemButtun.url" v-for='headerItemButtun in headerItemButtuns' :key='headerItemButtun.name' :href='headerItemButtun.url' class="headerItemButtun">
                    <li>
                        {{ headerItemButtun.name }}
                    </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import about from '../assets/image/shared/about.png'
import area from '../assets/image/shared/area.png'
import contact from '../assets/image/shared/contact.png'

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

const sliderItemImages: ReadonlyArray<NavItems> = [
    { name: 'about', path: about, url: 'about' },
    { name: 'area', path: contact, url: 'area' },
    { name: 'contact', path: area, url: 'contact' },
    { name: 'about', path: about, url: 'about' },
    { name: 'area', path: contact, url: 'area' },
    { name: 'contact', path: area, url: 'contact' }
]

const headerItemButtuns: ReadonlyArray<HeaderItems> = [
    { name: '目的', url: 'purpose' },
    { name: 'メニュー', url: 'menu' },
    { name: 'カテゴリー', url: 'category' }
]
</script>

<style scoped>
a {
    color: white;
}

.sliderItems {
    margin: 0px calc(50% - 50vw) 20px;
    width: 100vw;
    margin-top: 100px;
}

.sliderItemImage {
    padding: 0 2%;
}

.sliderItemImage img {
    width: 100%;
}

.headerItemButtunArea {
    position: relative;
    top: -2.2em;
}

.headerItemButtuns {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 50px;
}

.headerItemButtun {
    font-size: 10px;
    width: 15em;
    height: 3em;
    color: #fff;
    background: #cdbcac;
    line-height: 3em;
    border-radius: 15px;
}
</style>
