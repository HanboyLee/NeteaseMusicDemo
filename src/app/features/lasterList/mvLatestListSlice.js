import { createSlice, current } from "@reduxjs/toolkit";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import { storageKey, urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";
import { setStorge } from "../../../services/storgeHelper";
const initialState = {
    loading: true,
    //過濾器導覽
    TarBar: {
        TarBarArea: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
        TarBarType: ["全部", "官方版", "现场版", "网易出品"],
        TarBarOrder: ["上升最快", "最热", "最新"],
    },
    //列表
    mvList: [],
    //請求數據
    queryInfo: {
        area: "全部" /** 类型 **/,
        type: "全部" /** 类型 **/,
        order: "最热" /** 类型 **/,
        limit: 12 /** 当前页显示的数据 **/,
        offset: 0 /** 分页数据 **/,
        // total: 0 /** 总条数 **/,
        num: 1 /** 当前页数 **/,
    },
    mvCount: 0,
};

export const mvLatestListSlice = createSlice({
    name: "mvLatestList",
    initialState,
    reducers: {
        initMVAllByAmount(state, action) {
            // console.log(action.payload);
            let loading = action.payload.code === 200 ? false : true;
            return {
                ...state,
                mvList: action.payload.data,
                loading,
                mvCount: action.payload.count,
            };
        },
        onClickArea(state, action) {
            return {
                ...state,
                queryInfo: {
                    ...state.queryInfo,
                    area: action.payload,
                },
            };
        },
        onClickType(state, action) {
            return {
                ...state,
                queryInfo: {
                    ...state.queryInfo,
                    type: action.payload,
                },
            };
        },
        onClickSort(state, action) {
            return {
                ...state,
                queryInfo: {
                    ...state.queryInfo,
                    order: action.payload,
                },
            };
        },
        onCurrentChange(state, action) {
            return {
                ...state,
                queryInfo: {
                    ...state.queryInfo,
                    offset: action.payload.offset,
                },
            };
        },
        onCurrentChangePage(state, action) {
            return {
                ...state,
                queryInfo: {
                    ...state.queryInfo,
                    num: action.payload.num,
                },
            };
        },
        onLoading(state, action) {
            return { ...state, loading: action.payload };
        },
    },
});

export const {
    initMVAllByAmount,
    onClickArea,
    onClickType,
    onClickSort,
    onLoading,
    onCurrentChange,
    onCurrentChangePage,
} = mvLatestListSlice.actions;

export const getMvAllList =
    (params = {}) =>
    async (dispatch) => {
        try {
            dispatch(onLoading(true));
            const mvAllList = await apiHandle({ url: urlPath.MV_LASTER, params });
            dispatch(initMVAllByAmount(mvAllList));
        } catch (error) {
            console.log(error, "getTopList");
        }
    };

export default mvLatestListSlice.reducer;
