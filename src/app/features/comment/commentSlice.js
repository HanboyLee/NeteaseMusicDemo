import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

import { urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";

const initialState = {
    loading: true,
    commentList: {},
    queryInfo: {
        num: 1,
        offset: 0,
    },
    refreshComment: 0,
};

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        commentByAmount(state, action) {
            return {
                ...state,
                commentList: action.payload,
                loading: false,
            };
        },
        onCommentLoading(state, action) {
            return { ...state, loading: action.payload };
        },
        setPagination(state, action) {
            return {
                ...state,
                queryInfo: {
                    num: action.payload.num,
                    offset: action.payload.offset,
                },
            };
        },
        onPostCommenttimestamp(state, action) {
            return {
                ...state,
                refreshComment: action.payload,
            };
        },
    },
});

export const { commentByAmount, onCommentLoading, setPagination, onPostCommenttimestamp } = commentSlice.actions;

export const getComment =
    (params = {}, urlPath) =>
    async (dispatch) => {
        try {
            dispatch(onCommentLoading(true));
            const data = await apiHandle({ url: urlPath, params });
            dispatch(commentByAmount(data));
        } catch (error) {
            console.log(error, "getRecomment");
        }
    };

export const postComment = (params) => async (dispatch) => {
    const { comment } = await apiHandle({ url: urlPath.USER_SET_COMMENT, params });
    message.info("评论发送成功");
    dispatch(onPostCommenttimestamp(comment.time));
};

export default commentSlice.reducer;
