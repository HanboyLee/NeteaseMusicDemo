export const themeConstant = {
    primaryColor: "@primary-color",
    secondaryColor: "@secondary-color",
    linkColor: "@link-color",
    successColor: "@success-color",
    warningColor: "@warning-color",
    errorColor: "@error-color",
    fontSizeBase: "@font-size-base",
    headingColor: "@heading-color",
    textColor: "@text-color",
    textColorSecondary: "@text-color-secondary",
    textColorLight: "@text-color-light",
    disabledColor: "@disabled-color",
    borderRadiusBase: "@border-radius-base",
    borderColorBase: "@border-color-base",
    boxShadowBase: "@box-shadow-base",
};

export const urlPath = {
    //歌手
    TOPSONG_100: "/artist/top/song",
    ALBUM: "/artist/album",
    DETAIL: "/artist/detail",
    DESC: "/artist/desc",
    MV: "/artist/mv",
    SIMI: "/simi/artist",
    //MV
    MV_PROFILE: "/mv/detail",
    MV_COMMENT: "comment/mv",
    MV_URL: "mv/url",
    MV_RELATED: "/simi/mv",
    ALBUMLISTS: "/album",
    SINGER_LISTS: "/artist/list",
    SONG_URL: "/song/url", //id[] 可多筆
    SONG_LYRIC: "/lyric",
    //熱門
    TOPLIST_ARTIST: "/toplist",
    TOPLIST_DETAIL: "/toplist/deatil",
    TOPLIST_PLAYLIST_DETAIL: "/playlist/detail",
    TOPLIST_PLAYLIST_SONGS: "/playlist/track/all",
    TOPLIST_SONG_DETAIL: "/song/detail",
    //最新ＭＶ
    MV_LASTER: "/mv/all",
    //最新歌曲
    NEW_SONGS: "/top/song",
    //推薦歌曲
    RECOMMEND_SONG_TAG: "/playlist/catlist", //標籤
    RECOMMEND_SONG_LIST: "/top/playlist/highquality", //列表
    RECOMMEND_SONG_DETAIL: "/playlist/detail", //列表詳情
    RECOMMEND_COMMENT: "/comment/playlist", //歌單評論
    RECOMMEND_SUBSCRIBE: "/playlist/subscribers", //歌單收藏者
    //首頁
    HOME_BANNER: "/banner",
    HOME_PERSONALIZED: "/personalized?limit=12", //推荐歌单
    HOME_NEWSONG: "/personalized/newsong?limit=20", // 推荐新音乐
    HOME_PRIVATECONTENT: "/personalized/privatecontent", //獨家放送
    HOME_MV: "/personalized/mv", //推薦ＭＶ

    // 搜尋
    SEARCH: "/cloudsearch",

    //使用者
    USER_COUNTRUIES_CODE: "/countries/code/list",
    USER_SENT_CAPTCHA_CODE: "/captcha/sent",
    USER_VERIFY: "/captcha/verify",
    USER_PHONE_CHECK: "/cellphone/existence/check",
    USER_LOGIN: "/login/cellphone",
    USER_LOGOUT: "/logout",
    USER_SIGNUP: "/register/cellphone",
    //使用者登入歌單情況
    USER_PLAYLIST: "/user/playlist", //我的歌單
    USER_SUBCOUNT: "/user/subcount", //获取用户信息 , 歌单，收藏，mv, dj 数量
};

export const storageKey = {
    TRACK_QUEUE_SONG: "track_queue_song",
};
