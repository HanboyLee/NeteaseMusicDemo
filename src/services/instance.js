import axios from "axios";
import { API_URL, API_TIMEOUT } from "../configs/config";
import nprogress from "nprogress";
import { message } from "antd";

const instace = function () {
    const createInstance = axios.create({
        withCredentials: true,
        url: API_URL,
        timeout: API_TIMEOUT,
        responseType: "json",
        params: {
            realIP: "211.161.244.70",
        },
    });
    createInstance.interceptors.response.use(handleResponse, handleError);
    createInstance.interceptors.request.use(handleRequest, handleError);

    return createInstance;
};

//Response
const handleResponse = (res) => {
    try {
        // console.log(res, "handleResponse", 23);
        if (res.data.code !== 200) {
            throw new Error(res?.data?.message);
        }
        nprogress.done();
        return res.data;
    } catch (error) {
        message.error(error.message || "加載資料失敗", 2);
        nprogress.done();
    }
};
//Request
const handleRequest = (config) => {
    console.log(config, "??");
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
