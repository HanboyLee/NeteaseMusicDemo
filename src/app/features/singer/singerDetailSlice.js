import { createSlice } from "@reduxjs/toolkit";
import { urlPath } from "../../../configs/constant";
import axios from "../../../services/instance";

const initialState = {
    singerDetail: {},
    desc: {},
    albums: {},
    mvs: [],
    simi: [],
    loading: true,
    currentMv: [],
    topSong50: [],
};

export const singerDetailSlice = createSlice({
    name: "singerDetail",
    initialState,
    reducers: {
        singerDetailByAmount: (state, action) => {
            const singerDetail = action.payload[0].data;
            const desc = action.payload[1];
            const albums = action.payload[2].hotAlbums;
            const mvs = action.payload[3].mvs;
            const simi = action.payload[4].artists;
            const topSong50 = action.payload[5].songs;

            return {
                ...state,
                singerDetail,
                desc,
                albums,
                mvs,
                simi,
                topSong50,
                loading: false,
            };
        },
        getCurrentMvByAmount: (state, action) => {
            return {
                ...state,
                currentMv: action.payload,
            };
        },
        getAlbumMore: (state, action) => {
            return {
                ...state,
                albums: action.payload.hotAlbums,
            };
        },
        onLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { singerDetailByAmount, getCurrentMvByAmount, getAlbumMore, onLoading } = singerDetailSlice.actions;

export const singerDetailAsync = (params) => async (dispatch) => {
    dispatch(onLoading(true));
    const datas = await getSingerInfo(params);
    dispatch(singerDetailByAmount(datas));
};
//獲取歌手相關
const getSingerInfo = async (params) => {
    try {
        const apiContent = Promise.all([
            //歌手詳情
            apiHandle({ url: urlPath.DETAIL, params }),
            //歌手描述
            apiHandle({ url: urlPath.DESC, params }),
            //專輯
            apiHandle({ url: urlPath.ALBUM, params }),
            //歌手ＭＶ
            apiHandle({ url: urlPath.MV, params }),
            //熱門歌曲
            apiHandle({ url: urlPath.SIMI, params }),
            //歌手熱門50首歌曲
            apiHandle({ url: urlPath.TOPSONG_100, params }),
        ]);

        return apiContent;
    } catch (error) {
        console.log(error, "getSingerInfo");
    }
};
//獲取ＭＶ相關
export const getSingerMv = (params) => async (dispatch) => {
    try {
        dispatch(onLoading(true));
        const datas = await Promise.all([
            // 歌手單個mv描述
            apiHandle({ url: urlPath.MV_PROFILE, params: params[0] }),
            //歌手單個mv url
            apiHandle({ url: urlPath.MV_URL, params: params[1] }),
            //相關mv
            apiHandle({ url: urlPath.MV_RELATED, params: params[0] }),
        ]);
        console.log(datas, "datas");
        const extract = datas.map((item) => item?.data || item?.mvs || item);
        dispatch(getCurrentMvByAmount(extract));
        dispatch(onLoading(false));
    } catch (error) {
        console.log(error);
    }
};

//獲取專輯
export const getAlbum = (params) => async (dispatch) => {
    const datas = await apiHandle({ url: urlPath.ALBUM, params });
    dispatch(getAlbumMore(datas));
};

const apiHandle = ({ url, params }) => {
    return axios({
        url: `/api${url}`,
        params: {
            ...params,
        },
    });
};

export default singerDetailSlice.reducer;
