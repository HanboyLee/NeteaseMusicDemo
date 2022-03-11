import { createSlice } from "@reduxjs/toolkit";
import { urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";
const initialState = {
    loading: false,
    playlist: [],
    queryInfo: {
        limit: 30,
        offset: 0,
    },
    more: false,
};

export const userListsSlice = createSlice({
    name: "userList",
    initialState,
    reducers: {
        myPlayList(state, action) {
            return {
                ...state,
                playlist: action.payload.playlist,
                more: action.payload.more,
                loading: false,
            };
        },
        onLoading(state, action) {
            return { ...state, loading: action.payload };
        },
    },
});

export const { onLoading, myPlayList } = userListsSlice.actions;

export const getMyPlayList = (params) => async (dispatch) => {
    try {
        dispatch(onLoading(true));
        const datas = await apiHandle({ url: urlPath.USER_PLAYLIST, params });
        dispatch(myPlayList(datas));
    } catch (error) {
        console.log(error, "getMyPlayList");
    }
};

export default userListsSlice.reducer;
