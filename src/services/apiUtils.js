import axios from "../services/instance";
export const apiHandle = ({ url, params }) => {
    return axios({
        url: process.env.NODE_ENV === "development" ? `/api${url}` : `/api${url}`,
        params: {
            ...params,
        },
    });
};
