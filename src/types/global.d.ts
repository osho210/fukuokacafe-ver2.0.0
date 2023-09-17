interface NavItems {
    name: string
    path: string
    url: string
}

interface HeaderItems {
    name: string
    url: string
}

interface instagramUrl{
    name: string
    src: string
}

interface articleDetail {
    id: number
    title: string
}

interface business_days{
    day_id:number
    day_name: string
}

interface Cities{
    city_id:number
    city_name: string
}

interface Districts{
    district_id:number
    city_id:number
    district_name: string
}

interface categories{
    category_id:number
    category_name: string
}

interface ambiences{
    ambience_id:number
    ambience_name: string
}

interface menus{
    menu_id:number
    menu_name: string
}

interface hashtags{
    hashtag_id:number
    hashtag_name: string
}

interface shops {
    shop_id: number
    city_id: number
    district_id: number
    shop_name: string
    shop_slogan: string
    recomend1: string
    recomend2: string
    address: string
    phone_number: string
    parking_availability: boolean
    nearest_station: string
    star_rating: number
    number_reviewers: number
    shop_description: string
    blog_card_status_and_type: number
    blog_card_image: string
    blog_detail_path: string
    instagram_name: string
}

interface articles{
    article_id:number
    article_name: string
    article_title: string
    article_description: string
    article_date: date
    article_image: string
    article_summary: string
    article_sub_title: string
}

-- 画像テーブル
interface images {
    image_id:number
    image_url: string
    image_description: string
    photographer_icon: string
    photographer_name: string
}

interface shop_images{
    shop_id:number
    image_id:number
    photo
}

interface shop_menus{
    shop_id:number
    menu_id:number
}

interface shop_categories {
    shop_id:number
    category_id:number
}

interface shop_ambiences {
    shop_id:number
    ambience_id:number
}

interface shop_hashtags {
    shop_id:number
    hashtag_id:number
}

interface articles_shops{
    article_id:number
    shop_id:number
}

interface shop_business_days {
    shop_id:number
    day_id:number
    is_closed: boolean
    business_hours_start: time
    business_hours_end: time
}

interface shop_close_days {
    day_name:string
}
