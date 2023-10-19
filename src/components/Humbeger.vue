<template>
  <nav id="nav">
    <div class="hamburger" v-on:click='active = !active'>
      <span class="line line01" v-bind:class="{ 'v-line01': active }"></span>
      <span class="line line02" v-bind:class="{ 'v-line02': active }"></span>
      <span class="line line03" v-bind:class="{ 'v-line03': active }"></span>
    </div>
    <div class="menu" v-show="active">
      <ul>
        <router-link :to="'../' + humbegerItem.url" v-for="humbegerItem in humbegerItems" :key="humbegerItem.name" v-on:click='active = !active' :href="humbegerItem.url">
          <li>
            {{ humbegerItem.name }}
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const active = ref(false)
const humbegerItems: ReadonlyArray<HeaderItems> = [
  { name: 'ホーム', url: '/' },
  { name: '福岡カフェ日記について', url: 'about' },
  { name: 'カテゴリー検索', url: 'category' },
  { name: 'エリア検索', url: 'area' },
  { name: 'ハッシュタグ', url: 'hashtag' },
  { name: 'お問い合わせ', url: 'contact' }
  // {name: 'チャット形式で探す', url: 'chat'},
]

</script>

<style scoped>
section {
  text-align: center;
  padding: 40vh 0;
}

.hamburger {
  position: fixed;
  top: 15px;
  right: 0;
  width: 70px;
  height: 70px;
  cursor: pointer;
  z-index: 9;
}

.hamburger .line {
  position: absolute;
  top: 0;
  left: 20px;
  width: 32px;
  height: 2px;
  background: #333333;
  text-align: center;
}

.hamburger .line01 {
  top: 16px;
  transition: 0.4s ease;
}

.hamburger .line02 {
  top: 26px;
  transition: 0.4s ease;
}

.hamburger .line03 {
  top: 36px;
  transition: 0.4s ease;
}

.v-line01 {
  transform: translateY(10px) rotate(-45deg);
  transition: 0.4s ease;
}

.v-line02 {
  transition: 0.4s ease;
  opacity: 0;
}

.v-line03 {
  transform: translateY(-10px) rotate(45deg);
  transition: 0.4s ease;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.4s;
}

.menu-enter,
.menu-leave-to {
  opacity: 0;
}

.menu li {
  list-style: none;
  line-height: 1;
  padding: 1.2rem 0;
  border-bottom: 1px solid
}

.menu {
  height: 100vh;
  background: white;
  z-index: 8;
  padding: 4vw;
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  align-items: center;
}

.menu ul li {
  font-size: 18px;
}
</style>
