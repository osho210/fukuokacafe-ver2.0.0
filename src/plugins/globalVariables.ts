export default defineNuxtPlugin(nuxtApp => {
    const scrollPoint = ref(false)

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
    nuxtApp.provide('scrollPoint', scrollPoint)
    nuxtApp.provide('shopDetailLists', shopDetailLists)
    nuxtApp.provide('instaDetailLists', instaDetailLists)
})