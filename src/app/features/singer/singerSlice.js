import { createSlice } from "@reduxjs/toolkit";
import { urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";
import axios from "../../../services/instance";

const initialState = {
    navBar: {
        area: [
            { name: "全部", id: -1 },
            { name: "华语", id: 7 },
            { name: "欧美", id: 96 },
            { name: "日本", id: 8 },
            { name: "韩国", id: 16 },
            { name: "其他", id: 0 },
        ],
        type: [
            { name: "全部", id: -1 },
            { name: "男歌手", id: 1 },
            { name: "女歌手", id: 2 },
            { name: "乐队组合", id: 3 },
        ],
    },
    initial: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#",
    ],
    queryInfo: {
        type: -1,
        area: -1,
        limit: 30,
        offset: 0,
        initial: -1,
    },
    type_: "全部",
    area_: "全部",
    initial_: "热门",
    artists: [], // axios返回的歌手数据
    num: 1,
    size: 0,
};

export const musicSongSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        singerByAmount: (state, action) => {
            return {
                ...state,
                artists: action.payload.artists,
            };
        },
        onClickArea: (state, action) => {
            state.queryInfo.area = action.payload;
        },
        onClickCategory: (state, action) => {
            state.queryInfo.type = action.payload;
        },
        onClickInitial: (state, action) => {
            state.queryInfo.initial = action.payload;
        },
        onCurrentChange: (state, action) => {
            state.queryInfo.offset = action.payload.offset;
        },
        onSize: (state, action) => {
            state.queryInfo.offset = action.payload.offset;
        },
    },
});

// Action creators are generated for each case reducer function
export const { musicsByAmount, singerByAmount, onClickArea, onClickCategory, onClickInitial, onCurrentChange, onSize } =
    musicSongSlice.actions;

export const singerAsync = (queryInfo) => async (dispatch) => {
    const topSong = await apiHandle({ url: urlPath.SINGER_LISTS, params: queryInfo });
    dispatch(singerByAmount(topSong));
};

export default musicSongSlice.reducer;
