import { createSlice, current } from "@reduxjs/toolkit";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import { storageKey, urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";
import { setStorge } from "../../../services/storgeHelper";
const initialState = {
    loading: true,
    //過濾器導覽
    TarBarArea: [
        {
            name: "全部",
            id: 0,
        },
        {
            name: "华语",
            id: 7,
        },
        {
            name: "欧美",
            id: 96,
        },
        {
            name: "日本",
            id: 8,
        },
        {
            name: "韩国",
            id: 16,
        },
    ],
    //列表
    songsList: [],
    queryInfo: {
        type: 0,
    },
};

export const newSongsSlice = createSlice({
    name: "newSongs",
    initialState,
    reducers: {
        initNewSongsByAmount(state, action) {
            let loading = false;
            return {
                ...state,
                songsList: action.payload,
                loading,
            };
        },
        onLoading(state, action) {
            return { ...state, loading: action.payload };
        },
        onClickArea(state, action) {
            return {
                ...state,
                queryInfo: {
                    type: action.payload,
                },
            };
        },
    },
});

export const { initNewSongsByAmount, onClickArea, onLoading } = newSongsSlice.actions;

export const getNewSongsList =
    (params = {}) =>
    async (dispatch) => {
        try {
            dispatch(onLoading(true));
            const { data } = await apiHandle({ url: urlPath.NEW_SONGS, params });
            dispatch(initNewSongsByAmount(data));
        } catch (error) {
            console.log(error, "getNewSongsList");
        }
    };

export default newSongsSlice.reducer;
