import { createSlice, current } from "@reduxjs/toolkit";
import { message } from "antd";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import { storageKey, urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";
import { clearStroge, getStorge, setStorge } from "../../../services/storgeHelper";
const initialState = {
    qrcodeLoading: true,
    countriesCode: [],
    userInfo: getStorge({ key: "userInfo" }) || {},
    isVerify: false,
};
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        userLogin(state, action) {
            setStorge({ key: "userInfo", value: action.payload.userInfo });
            setStorge({ key: "token", value: action.payload.token });
            return {
                ...state,
                userInfo: action.payload.userInfo,
            };
        },
        userLogout(state, action) {
            clearStroge();
            return {
                ...state,
                userInfo: {},
            };
        },

        setCountrieCode(state, action) {
            console.log(action.payload);
            return {
                ...state,
                countriesCode: action.payload,
            };
        },
        setCaptchaInfo(state, action) {
            return {
                ...state,
                captchaInfo: {
                    ...action.payload,
                },
            };
        },
        setHasVerify(state, action) {
            return {
                ...state,
                isVerify: action.payload,
            };
        },
        onQRCodeLoading: {},
    },
});

export const { setCountrieCode, setHasVerify, userLogin, userLogout } = loginSlice.actions;

//獲取國際碼
export const getCountrieCode =
    (params = {}) =>
    async (dispatch) => {
        try {
            const {
                data: [{ countryList }],
            } = await apiHandle({ url: urlPath.USER_COUNTRUIES_CODE, params });
            dispatch(setCountrieCode(countryList));
        } catch (error) {
            console.log(error, "getCountrieCode");
        }
    };

//手機獲取驗證碼
export const getCaptcha =
    (params = {}) =>
    async (dispatch) => {
        try {
            // dispatch(onQRCodeLoading(true));
            const datas = await apiHandle({ url: urlPath.USER_SENT_CAPTCHA_CODE, params });
            console.log(datas, 111);
            if (datas.code === 400) {
                return;
            }
            dispatch(setHasVerify(datas.data));
        } catch (error) {
            console.log(error, "getCaptcha");
        }
    };
//檢查手機是否被註冊
export const checkPhoneHasUsing = async (params = {}) => {
    try {
        // dispatch(onQRCodeLoading(true));
        const {
            datas: { exist },
        } = await apiHandle({ url: urlPath.USER_PHONE_CHECK, params });
        if (exist !== -1) {
            message.error("手机已被注册过", 2);
        }
    } catch (error) {
        console.log(error, "checkPhoneHasUsing");
    }
};

//驗證碼
const authVerify = async (params) => {
    try {
        const { data } = await apiHandle({ url: urlPath.USER_VERIFY, params });
        console.log(data, "authVerify");
        return data;
    } catch (error) {
        message.error(error.message);
    }
};

export const authLogin = (params) => async (dispatch) => {
    try {
        // dispatch(onQRCodeLoading(true));
        const isVerify = params?.methodType ? !!params.methodType : await authVerify(params);
        if (isVerify) {
            delete params.methodType;
            const { profile: userInfo, token, ...rest } = await apiHandle({ url: urlPath.USER_LOGIN, params });
            console.log(userInfo, token, rest, "datas");
            dispatch(userLogin({ userInfo, token }));
        }
    } catch (error) {
        console.log(error, "AuthLogin");
    }
};

export default loginSlice.reducer;
