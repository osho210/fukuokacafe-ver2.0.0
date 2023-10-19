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
        <!-- シェア
        <h3>SNSで診断結果をシェアする</h3>
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a> -->
    </div>
</template>

<script setup lang="ts">
import java from '../../assets/image/diagnosis/java.png'
import keny from '../../assets/image/diagnosis/keny.png'
import yirg from '../../assets/image/diagnosis/yirg.png'
import suma from '../../assets/image/diagnosis/suma.png'
import kona from '../../assets/image/diagnosis/kona.png'
import rob from '../../assets/image/diagnosis/rob.png'
import harr from '../../assets/image/diagnosis/harr.png'
import guat from '../../assets/image/diagnosis/guat.png'


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
}
function buttonText(index: number) {
    // ボタンのテキストをインデックスに基づいて設定
    const texts = ["はい", "いいえ", "どちらかといえばはい", "どちらかと言えばいいえ"];
    return texts[index];
}

const typeArray = [
    { title: "JAVA", subTitle: "定番のカフェが好きな", desc: "安定した味を求める伝統主義者", img: java },
    { title: "KENY", subTitle: "人とは違うカフェに行きたい", desc: "革新を求める挑戦者", img: keny },
    { title: "YIRG", subTitle: "誰も知らないカフェに行きたい", desc: "未知の魅力に引かれる探求者", img: "yirg.png" },
    { title: "BLUE", subTitle: "インスタ映えするお店に行きたい", desc: "シーンを彩るトレンドセッター", img: yirg },
    { title: "SUMA", subTitle: "静かに足を伸ばすお店を探している", desc: "穏やかな環境で心を落ち着かせたい守護者", img: suma },
    { title: "KONA", subTitle: "おしゃべりができるお店を探している", desc: "コミュニケーションを楽しむ社交家", img: kona },
    { title: "ROB", subTitle: "コーヒーが美味しいお店を探している", desc: "味を追求するコーヒー純粋主義者", rob },
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
        ans1: [-3, 4, 5, 0, 2, 0, 0, 1, 0],
        ans2: [-2, 3, 4, 0, 1, 0, 0, 1, 0],
        ans3: [1, -2, -3, 0, -1, 0, 0, 0, 0],
        ans4: [2, -4, -5, 0, -2, 0, 0, -1, 0]
    },
    {
        question2: "アートやクリエイティブな雰囲気が好きだ。",
        ans1: [0, 4, 0, -2, 0, 0, 0, 4, 0],
        ans2: [0, 2, 0, -1, 0, 0, 0, 2, 0],
        ans3: [0, -2, 0, 1, 0, 0, 0, -2, 0],
        ans4: [0, -4, 0, 2, 0, 0, 0, -4, 0]
    },
    {
        question3: "お店を選ぶ時は雰囲気よりも美味しい食事が楽しめるかの方が重要だ",
        ans1: [0, 0, 0, 0, -2, -1, 0, -2, 10],
        ans2: [0, 0, 0, 0, -1, 0, 0, -1, 5],
        ans3: [0, 0, 0, 0, 1, 0, 0, 1, -2],
        ans4: [0, 0, 0, 0, 2, 1, 0, 2, -4]
    },
    {
        question4: "新作のメニュー・期間限定のメニューがあると試したくなる",
        ans1: [2, 2, 2, 3, 0, 0, -1, 2, 2],
        ans2: [1, 1, 1, 2, 0, 0, 0, 1, 1],
        ans3: [-1, -1, -1, -1, 0, 0, 0, -1, -1],
        ans4: [-2, -2, -2, -3, 0, 0, 1, -2, -2]
    },
    {
        question5: "福岡のカフェに関するランキングや人気投稿を頻繁にチェックしている",
        ans1: [4, 0, -1, 4, 0, 1, 0, 1, 1],
        ans2: [2, 0, 0, 2, 0, 0, 0, 1, 0],
        ans3: [-2, 0, 1, -2, 0, 0, 0, -1, 0],
        ans4: [-4, 0, 2, -4, 0, -1, 1, -2, -1]
    },
    {
        question6: "コーヒーを選ぶとき、産地や焙煎の深さなど自分だけのこだわりがある",
        ans1: [0, 1, 0, 0, 0, 0, 10, 2, 2],
        ans2: [0, 0, 0, 0, 0, 0, 3, 1, 1],
        ans3: [0, 0, 0, 0, 0, 0, 1, -1, -1],
        ans4: [0, 0, 0, 0, 0, 0, 0, -2, -2]
    },
    {
        question7: "リラックスして本を読めるような落ち着いた雰囲気の空間が好きだ",
        ans1: [0, 0, 0, -4, 4, -4, 0, 2, 0],
        ans2: [0, 0, 0, -2, 2, -2, 0, 1, 0],
        ans3: [0, 0, 0, 2, -2, 2, 0, -1, 0],
        ans4: [0, 0, 0, 4, -4, 4, 0, -2, 0]
    },
    {
        question8: "インスタグラムやSNSで人気のお店によくいく",
        ans1: [2, -4, -4, 4, 0, 1, 0, 0, 0],
        ans2: [1, -2, -2, 2, 0, 0, 0, 0, 0],
        ans3: [-1, 2, 2, -2, 0, 0, 0, 0, 0],
        ans4: [-2, 4, 4, -4, 0, -1, 0, 0, 0]
    },
    {
        question9: "カフェに行く時は友達とおしゃべりするときに行く",
        ans1: [0, 0, 0, 0, -4, 10, 0, 0, 0],
        ans2: [0, 0, 0, 0, -2, 3, 0, 0, 0],
        ans3: [0, 0, 0, 1, 2, 1, 0, -1, 0],
        ans4: [0, 0, 0, 2, 4, 0, 0, -2, 0]
    },
    {
        question10: "お店の外観や建物も含めて全体のデザインが気に入っているお店に足を運ぶことが多い",
        ans1: [0, 4, 2, 2, 0, 0, 0, 4, 0],
        ans2: [0, 2, 1, 1, 0, 0, 0, 3, 0],
        ans3: [0, -1, -1, -1, 0, 0, 0, -2, 0],
        ans4: [0, -2, -2, -2, 0, 0, 0, -4, 0]
    },
    {
        question11: "人の行列や人気度よりも、自分の直感や興味を優先してお店を選ぶことが多い",
        ans1: [0, 4, 4, 2, 0, 0, 0, 3, 0],
        ans2: [0, 3, 3, 1, 0, 0, 0, 1, 0],
        ans3: [0, -1, -1, -1, 0, 0, 0, -1, 0],
        ans4: [0, -2, -2, -2, 0, 0, 0, -2, 0]
    },
    {
        question12: "友達や知り合いが行っているお店に行ってみたいと思う。",
        ans1: [4, -3, 0, 2, 0, 4, 0, 0, 0],
        ans2: [3, -2, 0, 1, 0, 3, 0, 0, 0],
        ans3: [-1, 1, 0, -1, 0, -1, 0, 0, 0],
        ans4: [-2, 2, 0, -2, 0, -2, 0, 0, 0]
    }
    ,
    {
        question13: "お気に入りのお店を見つけると頻繁に通うほうだ",
        ans1: [4, 4, 4, 0, 0, 2, 2, 2, 2],
        ans2: [3, 3, 3, 0, 0, 1, 1, 1, 1],
        ans3: [-1, -1, -1, 0, 0, -1, -1, -1, -1],
        ans4: [-2, -2, -2, 0, 0, -2, -2, -2, -2]
    }
    ,
    {
        question14: "写真を撮る時、背景や雰囲気にもこだわりたいと思いますか？",
        ans1: [0, 2, 2, 5, 0, 0, 0, 2, 0],
        ans2: [0, 1, 1, 3, 0, 0, 0, 1, 0],
        ans3: [0, -1, -1, -2, 0, 0, 0, -1, 0],
        ans4: [0, -2, -2, -4, 0, 0, 0, -2, 0]
    }
    ,
    {
        question15: "楽しい会話や笑い声が、良い時間を過ごすための重要な要素だ",
        ans1: [0, 0, 0, 0, 0, 6, 0, 0, 2],
        ans2: [0, 0, 0, 0, 0, 4, 0, 0, 1],
        ans3: [0, 0, 0, 0, 0, 1, 0, 0, -1],
        ans4: [0, 0, 0, 0, 0, -2, 0, 0, -2]
    }
    ,
    {
        question16: "福岡のカフェといえば！のような王道なカフェに行くことが多い",
        ans1: [4, 0, -2, -4, 0, 0, -2, -4, 0],
        ans2: [3, 0, -1, -2, 0, 0, -1, -2, 0],
        ans3: [2, 0, 0, -1, 0, 0, 0, 2, 0],
        ans4: [-4, 0, 1, 2, 0, 0, 1, 4, 0]
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

/* @media screen and (max-width: 1024px) {
    .recommend_btn {
        display: flex;
    }
} */

/* chatbot pc */
@media screen and (min-width: 500px) {
    .recommend_text {
        text-align: center;
    }
}
</style>