import { createSlice } from "@reduxjs/toolkit";
import { urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";

const initialState = {
    loading: true,
    artistToplist: {},
    list: [],
    rewardToplist: {},
    playlist: {},
};

export const topListSlice = createSlice({
    name: "topList",
    initialState,
    reducers: {
        initTopListByAmount(state, action) {
            let loading = action.payload.topList.code === 200 ? false : true;
            return {
                ...state,
                ...action.payload.topList,
                playlist: { ...action.payload.playlist },
                loading,
            };
        },
        setTopPlayListDetailByAmount(state, action) {
            return {
                ...state,
                playlist: { ...action.payload },
            };
        },
    },
});

export const { initTopListByAmount, setTopPlayListDetailByAmount } = topListSlice.actions;

export const getTopList =
    (params = {}) =>
    async (dispatch) => {
        try {
            const topList = await apiHandle({ url: urlPath.TOPLIST_DETAIL, params });
            //預設獲取list第一筆
            const { playlist, privileges } = await apiHandle({
                url: urlPath.TOPLIST_PLAYLIST_DETAIL,
                params: { id: topList.list[0].id },
            });
            // const datas = await Promise.all([
            //     apiHandle({
            //         url: urlPath.TOPLIST_PLAYLIST_DETAIL,
            //         params: { id: topList.list[0].id },
            //     }),
            //     apiHandle({
            //         url: urlPath.TOPLIST_PLAYLIST_DETAIL,
            //         params: { id: topList.list[0].id },
            //     }),
            // ]);

            //獲取全部歌單個曲
            dispatch(initTopListByAmount({ topList, playlist: { playlist, privileges } }));
        } catch (error) {
            console.log(error, "getTopList");
        }
    };

export const getTopPlayListDetail =
    (params = {}) =>
    async (dispatch) => {
        try {
            const { playlist, privileges } = await apiHandle({ url: urlPath.TOPLIST_PLAYLIST_DETAIL, params });

            dispatch(setTopPlayListDetailByAmount({ playlist, privileges }));
        } catch (error) {
            console.log(error, "getTopPlayListDetail");
        }
    };

export default topListSlice.reducer;
