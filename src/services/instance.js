import axios from "axios";
import { API_URL, API_TIMEOUT } from "../configs/config";
import nprogress from "nprogress";
import { message } from "antd";
import { getStorge } from "./storgeHelper";

const instace = function () {
    const createInstance = axios.create({
        withCredentials: true,
        url: API_URL,
        timeout: API_TIMEOUT,
        responseType: "json",
        params: {
            cookie: JSON.parse(localStorage.getItem("token") || JSON.stringify({ cookie: "" })).cookie,
        },
    });
    createInstance.interceptors.response.use(handleResponse, handleError);
    createInstance.interceptors.request.use(handleRequest, handleError);

    return createInstance;
};

//Response
const handleResponse = (res) => {
    console.log(res, "handleResponse", 23);
    if (res.data.code !== 200) {
        message.error(res?.data?.message || "加載資料失敗", 2);
    }
    nprogress.done();
    return res.data;
};
//Request
const handleRequest = (config) => {
    // console.log(config, "handleRequest", 28);
    nprogress.start();
    return config;
};

//Error
const handleError = (error) => {
    const { response, msg } = error;
    message.error(response.data.msg);
    nprogress.done();
    Promise.reject(response ? new Error(response.data.message || msg) : error);
};

const request = instace();
export default request;
