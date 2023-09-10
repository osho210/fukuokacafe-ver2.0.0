interface NavItems {
    name: string
    path: string
    url: string
}

interface HeaderItems {
    name: string
    url: string
}

interface articleDetail {
    id: number
    title: string
}

interface article {
    id: number
    shopName: string
    shopImage: string
    photographer: string
    photographerId: string
    photographerUrl: string
    shopSlogan: string
    recomend1: string
    recomend2: string
    address: string
    phoneNumber: string
    businessHoursStart: string  //開始時刻
    businessHoursEnd: string    //終了時刻
    regularHoliday: string
    parkingAvailability: string
    nearestStation: string
    StarRating: number
    NumberReviewers: number
    shopDescription: string
    blogCardStatusAndType: number
    blogCardImage: string
    blogDetailPath: string
    hp: string
}