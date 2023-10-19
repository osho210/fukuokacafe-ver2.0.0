// 営業日
type BusinessCloseDay = {
    business_days: {
        day_name: string
    };
};

// 営業時間
type BusinessDay = {
    business_days: {
        business_hours_start: string
        business_hours_end: string
        is_closed: boolean
    };
};

type sliderItemImages = {
    images: {
        image_url: string;
        photographer_name: string;
        photographer_icon: string;
    };
    shops: {
        shop_name: string;
    };
}[];

type instgramEmbed = {
    embed_id: number
    embed_name: string
}[];

type shopList = {
    shop_id: number;
    shop_name: string;
    shop_images: {
        image_id: {
            image_url: string;
        }[];
    }[];
    shop_business_days?: {
        day_id: number
        business_hours_start: Date;
        business_hours_end: Date;
    }[];
}[];

type hashtags = {
    hashtag_id: number
    hashtag_name: string
}[]
