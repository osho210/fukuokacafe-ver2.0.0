<template>
    <div v-if="currentQuestion < questionArray.length">
        <h2 class="recommend_title">カフェ診断テスト</h2>
        <!-- 現在の質問を表示 -->
        <p class="recommend_num">QUESTION{{ currentQuestion + 1 }}</p>
        <p class="recommend_text">{{ questionArray[currentQuestion][`question${currentQuestion + 1}`] }}</p>
        <!-- 回答オプションを表示し、ユーザーが選択できるようにします -->
        <div class="recommend_btn_wrapper">
            <div class="recommend_btn" v-for="i in 4" :key="i" @click="saveAnswer(i, questionArray[currentQuestion][`ans${i}`])">
                <font-awesome-icon icon="fa-solid fa-play" style="height: 10px; margin-right: 10px;" />
                {{ buttonText(i - 1) }}
            </div>
        </div>
    </div>
    <div v-else>
        <div class="recommend_img">
            <img :src="recommendType(userAnswers).img" alt="カテゴリー">
        </div>
        <h3>SNSで診断結果をシェアする</h3>
        <button class="text-none ma-2" color="#1da1f2" rounded variant="flat" width="200" @click="twitterShare">シェアする</button>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'MBTI風カフェ分析',
    meta: [
        { hid: 'og:description', property: 'og:title', content: 'MBTI風カフェ分析' },
        { hid: 'og:url', property: 'og:description', content: 'MBTI風カフェ分析を作成しました' },
        { hid: 'og:image', property: 'og:image', content: 'https://sunny-profiterole-1f0989.netlify.app/_nuxt/java.caca99e1.png' }
    ]
});

import java from '../../assets/image/diagnosis/java.png'
import keny from '../../assets/image/diagnosis/keny.png'
import yirg from '../../assets/image/diagnosis/yirg.png'
import suma from '../../assets/image/diagnosis/suma.png'
import kona from '../../assets/image/diagnosis/kona.png'
import rob from '../../assets/image/diagnosis/rob.png'
import harr from '../../assets/image/diagnosis/harr.png'
import guat from '../../assets/image/diagnosis/guat.png'
import blue from '../../assets/image/diagnosis/blue.png'

import { createClient } from '@supabase/supabase-js'
const $config = useRuntimeConfig()
const supabaseUrl = $config.public.VITE_SUPABASE_URL
const supabaseApiKey = $config.public.VITE_SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseApiKey)

async function addData() {
    const { data, error } = await supabase
        .from('mbti')
        .insert([
            {
                java: userAnswers.value[0],
                keny: userAnswers.value[1],
                yirg: userAnswers.value[2],
                blue: userAnswers.value[3],
                suma: userAnswers.value[4],
                kona: userAnswers.value[5],
                rob: userAnswers.value[6],
                harr: userAnswers.value[7],
                guat: userAnswers.value[8]
            }
        ]);

    if (error) {
        console.error('Error adding data:', error);
    } else {
        console.log('Data added successfully:', data);
    }
}

const route = window.location.href
console.log(route)
async function twitterShare() {
    // シェアする画面を設定
    var shareURL = 'https://twitter.com/intent/tweet?text=' + "カフェのMBTI診断を作成してみました" + "診断結果はこちら" + '&url=' + route;
    // シェア用の画面へ移行
    location.href = shareURL;
}


definePageMeta({
    layout: "home"
});
const currentQuestion = ref(0)
let userAnswers = ref(new Array(9).fill(0));

const saveAnswer = (answerIndex: number) => {
    // 選択された回答に対応する配列を取得
    const selectedAnswer = questionArray.value[currentQuestion.value][`ans${answerIndex}`];

    // 配列の値を既存のスコアに加算
    userAnswers.value = userAnswers.value.map((score, index) => score + selectedAnswer[index]);

    // 次の質問へ進む
    currentQuestion.value += 1;

    if (currentQuestion.value === 16) {
        addData()
    }
}
function buttonText(index: number) {
    // ボタンのテキストをインデックスに基づいて設定
    const texts = ["はい", "いいえ", "どちらかといえばはい", "どちらかと言えばいいえ"];
    return texts[index];
}

const typeArray = [
    { title: "JAVA", subTitle: "定番のカフェが好きな", desc: "安定した味を求める伝統主義者", img: java },
    { title: "KENY", subTitle: "人とは違うカフェに行きたい", desc: "革新を求める挑戦者", img: keny },
    { title: "YIRG", subTitle: "誰も知らないカフェに行きたい", desc: "未知の魅力に引かれる探求者", img: yirg },
    { title: "BLUE", subTitle: "インスタ映えするお店に行きたい", desc: "シーンを彩るトレンドセッター", img: blue },
    { title: "SUMA", subTitle: "静かに足を伸ばすお店を探している", desc: "穏やかな環境で心を落ち着かせたい守護者", img: suma },
    { title: "KONA", subTitle: "おしゃべりができるお店を探している", desc: "コミュニケーションを楽しむ社交家", img: kona },
    { title: "ROB", subTitle: "コーヒーが美味しいお店を探している", desc: "味を追求するコーヒー純粋主義者", img: rob },
    { title: "HARR", subTitle: "芸術的なカフェに行きたい", desc: "芸術と感性を愛するクリエイティブソウル", img: harr },
    { title: "GUAT", subTitle: "美味しい食事がしたい", desc: "美味しいは正義、一口は幸せタイプ", img: guat }
]

function maxAnswer(userAnswers: Array<number>): number {
    return userAnswers.reduce((maxIndex = 0, value = 0, index = 0, array = []) => {
        return value > array[maxIndex] ? index : maxIndex;
    }, 0);
};

function recommendType(userAnswers: Array<number>) {
    const typeNumber = maxAnswer(userAnswers)
    const recommendTypeNum = typeArray[typeNumber]
    return recommendTypeNum
}

interface QuestionAnswer {
    question?: string;
    ans1: number[];
    ans2: number[];
    ans3: number[];
    ans4: number[];
}
type QuestionArray = Array<QuestionAnswer>;

const questionArray: QuestionArray = ref([
    {
        question1: "誰も行ったことないような隠れ家的お店が好き。",
        ans1: [-3, 5, 5, 0, 3, 0, 0, 3, 0],
        ans2: [2, -4, -5, 0, -2, 0, 0, -1, 0],
        ans3: [-2, 3, 4, 0, 1, 0, 0, 1, 0],
        ans4: [1, -2, -3, 0, -1, 0, 0, 0, 0],
    },
    {
        question2: "アートやクリエイティブな雰囲気が好きだ。",
        ans1: [0, 2, 0, -2, 4, 0, 0, 12, 0],
        ans2: [0, -4, 0, 2, 0, 0, 0, -4, 0],
        ans3: [0, 1, 0, -1, 2, 0, 0, 5, 0],
        ans4: [0, -2, 0, 1, 0, 0, 0, -2, 0],
    },
    {
        question3: "お店を選ぶ時は雰囲気よりも美味しい食事が楽しめるかの方が重要だ",
        ans1: [0, 0, 0, 0, -2, -1, 0, -2, 10],
        ans2: [0, 0, 0, 0, 2, 1, 0, 2, -4],
        ans3: [0, 0, 0, 0, -1, 0, 0, -1, 5],
        ans4: [0, 0, 0, 0, 1, 0, 0, 1, -2],
    },
    {
        question4: "新作のメニュー・期間限定のメニューがあると試したくなる",
        ans1: [5, 2, 2, 3, -3, 0, -1, 2, 4],
        ans2: [-2, -2, -2, 0, 0, 0, 1, -2, -2],
        ans3: [2, 1, 1, 2, -1, 0, 0, 1, 1],
        ans4: [-1, -1, -1, 0, 0, 0, 0, -1, -1],
    },
    {
        question5: "福岡のカフェに関するランキングや人気投稿を頻繁にチェックしている",
        ans1: [4, 0, -1, 4, 0, 1, 0, 1, 1],
        ans2: [-4, 0, 2, -4, 0, -1, 1, -2, -1],
        ans3: [2, 0, 0, 2, 0, 0, 0, 1, 0],
        ans4: [-2, 0, 1, -2, 0, 0, 0, -1, 0],
    },
    {
        question6: "コーヒーを選ぶとき、産地や焙煎の深さなど自分だけのこだわりがある",
        ans1: [0, 4, 0, 0, 0, 0, 20, 3, 2],
        ans2: [0, 0, 0, 0, 0, 0, 0, -2, -2],
        ans3: [0, 2, 0, 0, 0, 0, 10, 2, 1],
        ans4: [0, 0, 0, 0, 0, 0, 0, -1, -1],
    },
    {
        question7: "リラックスして本を読めるような落ち着いた雰囲気の空間が好きだ",
        ans1: [0, 3, 0, -4, 6, -4, 0, 2, 0],
        ans2: [0, 0, 0, 4, -4, 4, 0, -2, 0],
        ans3: [0, 1, 0, -2, 4, -2, 0, 2, 0],
        ans4: [0, 0, 0, 2, -2, 2, 0, -1, 0],
    },
    {
        question8: "インスタグラムやSNSで人気のお店によくいく",
        ans1: [6, -4, -4, 2, 0, 1, 0, 0, 0],
        ans2: [-2, 4, 4, -2, 0, -1, 0, 0, 0],
        ans3: [3, -2, -2, 1, 0, 0, 0, 0, 0],
        ans4: [-1, 2, 2, -1, 0, 0, 0, 0, 0],
    },
    {
        question9: "カフェに行く時は友達とおしゃべりするときに行く",
        ans1: [3, 0, 0, 3, 2, 8, 0, -2, 0],
        ans2: [0, 0, 0, -2, -2, 0, 0, 2, 0],
        ans3: [1, 0, 0, 1, 1, 4, 0, -1, 0],
        ans4: [0, 0, 0, -1, -1, 1, 0, 1, 0],
    },
    {
        question10: "お店の外観や建物も含めて全体のデザインが気に入っているお店に足を運ぶことが多い",
        ans1: [0, 4, 2, 2, 4, 0, 0, 2, 0],
        ans2: [0, -2, -2, -2, 0, 0, 0, -2, 0],
        ans3: [0, 2, 1, 1, 2, 0, 0, 1, 0],
        ans4: [0, -1, -1, -1, 0, 0, 0, -1, 0],
    },
    {
        question11: "人の行列や人気度よりも、自分の直感や興味を優先してお店を選ぶことが多い",
        ans1: [0, 4, 4, 2, 2, 0, 0, 2, 0],
        ans2: [0, -2, -2, -2, 0, 0, 0, -2, 0],
        ans3: [0, 3, 3, 1, 2, 0, 0, 1, 0],
        ans4: [0, -1, -1, -1, 0, 0, 0, -1, 0],
    },
    {
        question12: "友達や知り合いが行っているお店に行ってみたいと思う。",
        ans1: [5, -3, 0, 2, 2, 4, 0, 0, 0],
        ans2: [-2, 2, 0, -2, 0, -2, 0, 0, 0],
        ans3: [3, -2, 0, 1, 1, 3, 0, 0, 0],
        ans4: [-1, 1, 0, -1, 0, -1, 0, 0, 0],
    }
    ,
    {
        question13: "お気に入りのお店を見つけると頻繁に通うほうだ",
        ans1: [0, 4, 4, 0, 4, 2, 2, 2, 2],
        ans2: [0, -2, -2, 0, 0, -2, -2, -2, -2],
        ans3: [0, 3, 3, 0, 2, 1, 1, 1, 1],
        ans4: [0, -1, -1, 0, 0, -1, -1, -1, -1],
    }
    ,
    {
        question14: "写真を撮る時、背景や雰囲気にもこだわりたいと思う",
        ans1: [0, 2, 2, 6, 0, 0, 0, 2, 0],
        ans2: [0, -2, -2, 0, 0, 0, 0, -2, 0],
        ans3: [0, 1, 1, 3, 0, 0, 0, 1, 0],
        ans4: [0, -1, -1, 0, 0, 0, 0, -1, 0],
    }
    ,
    {
        question15: "楽しい会話や笑い声が、良い時間を過ごすための重要な要素だ",
        ans1: [0, 0, 0, 0, 2, 2, 0, 0, 2],
        ans2: [0, 0, 0, 0, 0, -2, 0, 0, -2],
        ans3: [0, 0, 0, 0, 1, 1, 0, 0, 1],
        ans4: [0, 0, 0, 0, 0, -1, 0, 0, -1],
    }
    ,
    {
        question16: "福岡のカフェといえば！のような王道なカフェに行くことが多い",
        ans1: [4, 0, -2, 4, 0, 0, -2, -4, 0],
        ans2: [-4, 0, 1, -2, 0, 0, 1, 4, 0],
        ans3: [3, 0, -1, 3, 0, 0, -1, -2, 0],
        ans4: [2, 0, 0, -1, 0, 0, 0, 2, 0],
    }
])


</script>

<style>
.recommend_btn {
    display: block;
    width: 80%;
    margin: 10px auto;
    padding: 15px;
    font-size: 18px;
    background-color: #917055;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
    text-align: left;
    margin: 10px auto;
}

.recommend_title {
    text-align: center;
}

.recommend_text {
    margin: 10px;
}

.recommend_num {
    text-align: center;
}

.recommend_btn_wrapper {
    margin: 30px auto;
    display: block;
}

.character {
    text-align: center;
}

.recommend_img img {
    width: 100%;
}

/* chatbot pc */
@media screen and (min-width: 500px) {
    .recommend_text {
        text-align: center;
    }

    .recommend_img {
        max-width: 600px;
        margin: 0 auto;
    }
}
</style>