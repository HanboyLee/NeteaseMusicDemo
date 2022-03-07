import { createSlice, current } from "@reduxjs/toolkit";
import { urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";
const initialState = {
    currentPane: "songData",
    loading: true,
    total: 0,
    songData: {
        list: [],
        total: 0,
    },
    songListData: {
        list: [],
        total: 0,
    },
    mvData: {
        list: [],
        total: 0,
    },
    //列表
    navBar: [
        {
            id: 1,
            name: "歌曲",
            container: "songData",
        },
        {
            id: 1000,
            name: "歌单",
            container: "songListData",
        },
        {
            id: 1004,
            name: "MV",
            container: "mvData",
        },
    ],
    queryInfo: {
        limit: 10,
        offset: 0,
        type: 1,
    },
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchByAmount(state, action) {
            const { container } = current(state.navBar).find((item) => item.id === action.payload.containerType);

            return {
                ...state,
                [container]: action.payload.datas,
                total: action.payload.datas.total,
                loading: false,
            };
        },
        setType(state, action) {
            return {
                ...state,
                queryInfo: {
                    limit: 10,
                    offset: 0,
                    type: action.payload,
                },
            };
        },
        setChangeCurrentPage(state, action) {
            return {
                ...state,
                queryInfo: {
                    ...state.queryInfo,
                    ...action.payload,
                },
            };
        },
        onLoading(state, action) {
            return { ...state, loading: action.payload };
        },
    },
});

export const { searchByAmount, setChangeCurrentPage, setType, onLoading } = searchSlice.actions;

export const getSearch =
    (params = {}) =>
    async (dispatch) => {
        try {
            dispatch(onLoading(true));
            const { result } = await apiHandle({ url: urlPath.SEARCH, params });
            const map = {};
            for (const key in result) {
                if (typeof result[key] === "number") {
                    map.total = result[key];
                }
                if (Array.isArray(result[key])) {
                    map.list = result[key];
                }
            }
            dispatch(searchByAmount({ datas: map, containerType: params.type }));
        } catch (error) {
            console.log(error, "getSearch");
        }
    };

export default searchSlice.reducer;
