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

type Shop = {

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
