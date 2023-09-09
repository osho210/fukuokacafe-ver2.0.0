<template>
    <!-- 行く相手 -->
    <section class="contentTitle">
        <h2>行く相手から選択</h2>
        <ul class="contentLists">
            <li v-for="purposeItem in purposeItems" :key="purposeItem.name" :ref="purposeItem.url" class="purposeItem">
                <router-link :to="'purpose/' + purposeItem.url">
                    <p class="contentList">
                        <img :src="purposeItem.path" alt="行く相手">
                    </p>
                    <p>{{ purposeItem.name }}</p>
                </router-link>
            </li>
        </ul>
        <div class="contentArticle">
            <div>
                <h2>目的から探す</h2>
                <p>モーニングやランチなどのおすすめなお店をご紹介！目的に合わせたカフェ探しの参考にしてくださいね！</p>
                <button type="button" class="button">
                    <router-link to="purpose">
                        詳細はこちら
                    </router-link>
                </button>
            </div>
            <img src="../assets/image/article/top/purpose_icon.svg" alt="">
            <button type="submit" class="button">
                <router-link to="purpose">
                    覗いてみる
                </router-link>
            </button>
        </div>
    </section>
    <!-- メニュー -->
    <section class="contentTitle">
        <h2>人気メニューから選択</h2>
        <ul class="contentLists">
            <li v-for="menuItem in menuItems" :key="menuItem.name" :ref="menuItem.url">
                <router-link :to="'menu/' + menuItem.url">
                    <p class="contentList">
                        <img :src="menuItem.path" alt="メニュー">
                    </p>
                    <p>{{ menuItem.name }}</p>
                </router-link>
            </li>
        </ul>
        <div class="contentArticle">
            <div>
                <h2>メニューから探す</h2>
                <p>カフェメニューの中でも人気なスイーツを厳選してご紹介。美味しいスイーツ探しの参考にしてみてくださいね！</p>
                <button type="button" class="button">
                    <router-link to="menu">
                        詳細はこちら
                    </router-link>
                </button>
            </div>
            <img src="../assets/image/article/top/menu_icon.svg" alt="">
            <button type="submit" class="button">
                <router-link to="menu">
                    覗いてみる
                </router-link>
            </button>
        </div>
    </section>
    <!-- エリア -->
    <section class="contentTitle">
        <h2>人気エリアから選択</h2>
        <ul class="contentLists">
            <li v-for="AreaItem in AreaItems" :key="AreaItem.name" :ref="AreaItem.url">
                <router-link :to="'area/' + AreaItem.url">
                    <p class="contentList">
                        <img :src="AreaItem.path" alt="エリア">
                    </p>
                    <p>{{ AreaItem.name }}</p>
                </router-link>
            </li>
        </ul>
        <div class="contentArticle">
            <div>
                <h2>エリアから探す</h2>
                <p>福岡のカフェを地域ごとに紹介しています。自分好みのカフェを探す旅へ、さぁ出かけよう！</p>
                <button type="button" class="button">
                    <router-link to="area">
                        詳細はこちら
                    </router-link>
                </button>
            </div>
            <img src="../assets/image/article/top/area_icon.svg" alt="エリア一覧">
            <button type="submit" class="button">
                <router-link to="area">
                    覗いてみる
                </router-link>
            </button>
        </div>
    </section>
    <!-- カテゴリー -->
    <section class="contentTitle">
        <h2>カテゴリーから選択</h2>
        <ul class="contentLists">
            <li v-for="categoryItem in categoryItems" :key="categoryItem.name" :ref="categoryItem.url">
                <router-link :to="'category/' + categoryItem.url">
                    <p class="contentList">
                        <img :src="categoryItem.path" alt="カテゴリー">
                    </p>
                    <p>{{ categoryItem.name }}</p>
                </router-link>
            </li>
        </ul>
        <div class="contentArticle">
            <div>
                <h2>カテゴリーから探す</h2>
                <p>海カフェや夕陽の見えるカフェなど自然と楽しむカフェをご紹介。季節や気分に合わせたカフェ探しの参考にしてみてください。</p>
                <button type="button" class="button">
                    <router-link to="category">
                        詳細はこちら
                    </router-link>
                </button>
            </div>
            <img src="../assets/image/article/top/category_icon.svg" alt="">
            <button type="submit" class="button">
                <router-link to="category">
                    覗いてみる
                </router-link>
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
// 目的
import date from '../assets/image/article/top/purpose_date.svg'
import friend from '../assets/image/article/top/purpose_friend.svg'
import single from '../assets/image/article/top/purpose_single.svg'
import area from '../assets/image/article/top/purpose_morning.svg'

// メニュー
import purin from '../assets/image/article/top/menu_purin.jpg'
import donut from '../assets/image/article/top/menu_donut.jpg'
import cheesecake from '../assets/image/article/top/menu_cheesecake.jpg'
import mattha from '../assets/image/article/top/menu_maccha.jpg'

// エリア
import hakata from '../assets/image/article/top/area_hakata.jpg'
import kitakyushu from '../assets/image/article/top/area_kitakyushu.jpg'
import chuou from '../assets/image/article/top/area_chuou.jpg'
import itoshima from '../assets/image/article/top/area_itoshima.jpg'

// カテゴリー
import kominka from '../assets/image/article/top/category_kominka.jpg'
import komore from '../assets/image/article/top/category_komore.jpg'
import book from '../assets/image/article/top/category_book.jpg'
import corea from '../assets/image/article/top/category_corea.jpg'


const purposeItems: ReadonlyArray<NavItems> = [
    { name: 'デート', path: date, url: 'date' },
    { name: '友達', path: friend, url: 'friend' },
    { name: 'おひとり', path: single, url: 'single' },
    { name: 'ママ友', path: area, url: 'girls' }
]

const menuItems: ReadonlyArray<NavItems> = [
    { name: 'プリン', path: purin, url: 'purin' },
    { name: 'ドーナツ', path: donut, url: 'donut' },
    { name: 'チーズケーキ', path: cheesecake, url: '' },
    { name: '抹茶スイーツ', path: mattha, url: '' }
]

const AreaItems: ReadonlyArray<NavItems> = [
    { name: '博多', path: hakata, url: '' },
    { name: '北九州', path: kitakyushu, url: '' },
    { name: '中央区', path: chuou, url: '' },
    { name: '糸島', path: itoshima, url: '' }
]

const categoryItems: ReadonlyArray<NavItems> = [
    { name: '古民家カフェ', path: kominka, url: '' },
    { name: '木漏れ日カフェ', path: komore, url: '' },
    { name: 'ブックカフェ', path: book, url: '' },
    { name: '韓国風カフェ', path: corea, url: '' }
]

</script>
<style>
/* keyvisual */
.keyContent {
    /* 画面幅を超えて合わせる */
    margin: 0 calc(50% - 50vw) 60px;
    width: 100vw;
}

.keyContent img {
    width: 100%;
}

.selectorList {
    width: 80%;
    margin: 0 auto;
    max-width: 400px;
    text-align: center;
}

.selectorListSearch {
    display: flex;
    margin-top: 5%;
}

.selectorListSearch input {
    width: 100%;
    border-radius: 6px 0 0 6px;
}

.selectorListSearchButton {
    width: 40px;
    background: #978574;
    padding: 2px;
    border-radius: 0 6px 6px 0;
}

.contentTitle {
    text-align: center;
    margin-bottom: 10px;
    padding: 0 8vw;
}

.contentLists {
    display: grid;
    -ms-grid-columns: (minmax(150px, 1fr))[auto-fit];
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2%;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    text-align: center;
    margin: 5% 0 10%;
}

.purposeItem{
    padding: 30px;
}

.contentList img {
    width: 100%;
}

.contentArticle {
    border: 1px solid #000;
    border-radius: 15px;
    padding: 5%;
    display: flex;
}

.contentArticle img {
    margin: 0;
    width: 40%;
}

.contentArticle div {
    margin: auto 0;
    text-align: left;
}

.contentArticle div p {
    margin: 5% 0;
}

.contentArticle div button {
    display: inline-block;
}

.contentArticle button {
    display: none;
}

.contentArticle button a {
    color: #fff;
}

#chatbase-bubble-window {
    bottom: 200 !important;
}

@media screen and (max-width: 1024px) {
    .content {
        display: block;
    }

    .contentMain {
        width: 100%;
    }

    .contentSide {
        display: none;
    }
}

/* mby */
@media screen and (max-width: 550px) {
    .content {
        display: block;
    }

    .contentMain {
        width: 100%;
    }

    .contentTitle {
        padding: 0 10px;
    }

    .contentSide {
        display: none;
    }

    .contentArticle {
        display: block;
    }

    .contentArticle div {
        text-align: center;
    }

    .contentArticle div button {
        display: none;
    }

    .contentArticle button {
        display: inline-block;
    }

    .contentArticle img {
        margin: 5% 0 10%;
        width: 80%;
    }

    footer {
        margin: 0 calc(50% - 50vw) 75px;
    }
}
</style>