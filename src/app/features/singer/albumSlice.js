import { createSlice } from "@reduxjs/toolkit";
import { urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";

const initialState = {
    albumlists: [],
    album: {},
    loading: true,
};

export const albumSlice = createSlice({
    name: "albumLists",
    initialState,
    reducers: {
        getAlbumByAmount: (state, action) => {
            return {
                ...state,
                albumlists: action.payload.songs,
                album: action.payload.album,
                loading: false,
            };
        },
    },
});

export const { getAlbumByAmount, track_queue } = albumSlice.actions;

export const getAlbumList = (params) => async (dispatch) => {
    const datas = await apiHandle({ url: urlPath.ALBUMLISTS, params });
    dispatch(getAlbumByAmount(datas));
};

export default albumSlice.reducer;
