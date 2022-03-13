import { createSlice } from "@reduxjs/toolkit";
import { urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";
const initialState = {
    loading: true,

    //列表
    bannerList: [],
    personalized: [],
    newsong: [],
    privatecontent: [],
    mv: [],
};

export const personalizedSlice = createSlice({
    name: "personalized",
    initialState,
    reducers: {
        personalizedByAmount(state, action) {
            const [{ banners: bannerList }, { result: personalized }] = action.payload;
            return {
                ...state,
                bannerList,
                personalized,
                loading: false,
            };
        },
        personalized2ByAmount(state, action) {
            const [{ result: newsong }, privatecontent, { result: mv }] = action.payload;
            return {
                ...state,
                newsong,
                privatecontent,
                mv,
            };
        },
        onLoading(state, action) {
            return { ...state, loading: action.payload };
        },
    },
});

export const { personalizedByAmount, personalized2ByAmount, onLoading } = personalizedSlice.actions;

export const getPersonalizedList =
    (params = {}) =>
    async (dispatch) => {
        try {
            dispatch(onLoading(true));
            const datas = await Promise.all([
                await apiHandle({ url: urlPath.HOME_BANNER, params }),
                await apiHandle({ url: urlPath.HOME_PERSONALIZED, params }),
            ]);
            dispatch(personalizedByAmount(datas));
            const datas1 = await Promise.all([
                await apiHandle({ url: urlPath.HOME_NEWSONG, params }),
                await apiHandle({ url: urlPath.HOME_PRIVATECONTENT, params }),
                await apiHandle({ url: urlPath.HOME_MV, params }),
            ]);
            dispatch(personalized2ByAmount(datas1));
        } catch (error) {
            console.log(error, "getPersonalizedList");
        }
    };

export default personalizedSlice.reducer;
