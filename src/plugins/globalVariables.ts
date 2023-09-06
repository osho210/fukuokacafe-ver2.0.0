export default defineNuxtPlugin(nuxtApp => {
    const scrollPoint = ref(false)
    let showMobileActive =  ref(true)
    let showPcActive =  ref(true)

    const shopDetailLists: ReadonlyArray<articleDetail> = [
        {id: 1, title: '店舗詳細'},
        {id: 2, title: 'おすすめな人'},
        {id: 3, title: '店舗情報'},
        {id: 4, title: 'インスタ'}
    ]

    const instaDetailLists: ReadonlyArray<articleDetail> = [
        {id: 1, title: '店舗詳細'},
        {id: 2, title: 'おすすめな人'},
        {id: 3, title: 'インスタ'}
    ]

    // 画面幅に応じて適応するcssプロパティの変更
    const handleResize = ()=>{
        if (window.innerWidth <= 550) {
            showMobileActive.value = true
            showPcActive.value = false
        } else {
            showMobileActive.value = false
            showPcActive.value = true
        }
    }
    nuxtApp.provide('scrollPoint', scrollPoint)
    nuxtApp.provide('showMobileActive', showMobileActive)
    nuxtApp.provide('showPcActive', showPcActive)
    nuxtApp.provide('shopDetailLists', shopDetailLists)
    nuxtApp.provide('instaDetailLists', instaDetailLists)
    nuxtApp.provide('handleResize', handleResize)
})