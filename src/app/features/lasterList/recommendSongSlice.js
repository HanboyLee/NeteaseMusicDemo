import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

import { urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";
const initialState = {
    loading: true,
    listLoading: true,
    detailLoading: true,
    songsLoading: true,
    subscribeLoading: true,
    //過濾器導覽
    tagbar: [],
    hotTagbar: [
        "全部",
        "粤语",
        "ACG",
        "华语",
        "流行",
        "欧美",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "怀旧",
    ],
    //列表
    recommendList: [],
    total: 0,
    queryInfo: {
        cat: "全部",
        limit: 18,
        num: 1,
    },
    playDeatail: {},
    songs: [],
    subscribers: {},
};

export const recommendSongSlice = createSlice({
    name: "recommendSong",
    initialState,
    reducers: {
        recommendSongTagByAmount(state, action) {
            let loading = false;
            return {
                ...state,
                tagbar: action.payload,
                loading,
            };
        },

        recommendSongListByAmount(state, action) {
            const { playlists, total } = action.payload;
            return {
                ...state,
                recommendList: playlists,
                total,
                listLoading: false,
            };
        },
        recommendSongDeatilByAmount(state, action) {
            return {
                ...state,
                playDeatail: action.payload,
                detailLoading: false,
            };
        },
        songsByAmount(state, action) {
            return {
                ...state,
                songs: action.payload,
                songLoading: false,
            };
        },
        subscribeByAmount(state, action) {
            return {
                ...state,
                subscribers: action.payload,
                subscribeLoading: false,
            };
        },
        onClickCat(state, action) {
            return {
                ...state,
                queryInfo: {
                    ...state.queryInfo,
                    cat: action.payload,
                },
            };
        },
        onCurrentChange(state, action) {
            return {
                ...state,
                queryInfo: {
                    ...state.queryInfo,
                    before: state.recommendList[state.recommendList.length - 1].updateTime,
                    num: action.payload,
                },
            };
        },

        setLoading(state, action) {
            return { ...state, loading: action.payload };
        },
        setListLoading(state, action) {
            return { ...state, listLoading: action.payload };
        },
        setDetailLoading(state, action) {
            return { ...state, detailLoading: action.payload };
        },
        setSongsLoading(state, action) {
            return { ...state, songsLoading: action.payload };
        },
        setSubscribeLoading(state, action) {
            return { ...state, subscribeLoading: action.payload };
        },
    },
});

export const {
    recommendSongTagByAmount,
    recommendSongListByAmount,
    recommendSongDeatilByAmount,
    songsByAmount,
    subscribeByAmount,
    onClickCat,
    setLoading,
    setListLoading,
    setDetailLoading,
    setSongsLoading,
    setSubscribeLoading,
    onCurrentChange,
} = recommendSongSlice.actions;

//標籤
export const getRecommendTags =
    (params = {}) =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const { categories, sub } = await apiHandle({ url: urlPath.RECOMMEND_SONG_TAG, params });
            let navBar = Object.values(categories).map((item, i) => ({ id: i + 1, name: item }));
            //tag 分類
            for (let i = 0; i < navBar.length; i++) {
                navBar[i].id = i + 1;
                navBar[i].tags = sub.filter((item) => item.category === i);
            }
            dispatch(recommendSongTagByAmount(navBar));
        } catch (error) {
            console.log(error, "getRecommendTags");
        }
    };

//列表清單
export const getRecommendList = (params) => async (dispatch) => {
    dispatch(setListLoading(true));
    const { playlists, total } = await apiHandle({ url: urlPath.RECOMMEND_SONG_LIST, params });
    dispatch(recommendSongListByAmount({ playlists, total }));
};

//清單詳情
export const getRecommendDeatil = (params) => async (dispatch) => {
    try {
        dispatch(setDetailLoading(true));
        const { playlist } = await apiHandle({ url: urlPath.RECOMMEND_SONG_DETAIL, params });
        dispatch(recommendSongDeatilByAmount(playlist));
    } catch (error) {
        message.error(error.message, (e) => {
            window.location.replace(window.location.origin);
        });
    }
};

//獲取全部歌單細節
export const getRecommendSongsDeatil = (params) => async (dispatch) => {
    dispatch(setSongsLoading(true));
    const { songs } = await apiHandle({ url: urlPath.TOPLIST_SONG_DETAIL, params });
    dispatch(songsByAmount(songs));
};

//獲取歌單收藏者
export const getRecommendSubscribe = (params) => async (dispatch) => {
    dispatch(setSubscribeLoading(true));
    const datas = await apiHandle({ url: urlPath.RECOMMEND_SUBSCRIBE, params });
    dispatch(subscribeByAmount(datas));
};
export default recommendSongSlice.reducer;
