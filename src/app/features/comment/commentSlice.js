import { createSlice, current } from "@reduxjs/toolkit";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import { storageKey, urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";
import { setStorge } from "../../../services/storgeHelper";
const initialState = {
    recommentLoading: true,
    recommentComment: {},
    recommentQueryInfo: {
        num: 1,
        offset: 0,
    },
};

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        recommentByAmount(state, action) {
            return {
                ...state,
                recommentComment: action.payload,
                recommentLoading: false,
            };
        },
        onRecommentLoading(state, action) {
            return { ...state, recommentLoading: action.payload };
        },
        onRecommentPagination(state, action) {
            console.log(action.payload.offset);
            return {
                ...state,
                recommentQueryInfo: {
                    num: action.payload.num,
                    offset: action.payload.offset,
                },
            };
        },
    },
});

export const { recommentByAmount, onRecommentLoading, onRecommentPagination } = commentSlice.actions;

export const getRecommentComment =
    (params = {}) =>
    async (dispatch) => {
        try {
            dispatch(onRecommentLoading(true));
            const data = await apiHandle({ url: urlPath.RECOMMEND_COMMENT, params });
            dispatch(recommentByAmount(data));
        } catch (error) {
            console.log(error, "getRecomment");
        }
    };

export default commentSlice.reducer;
