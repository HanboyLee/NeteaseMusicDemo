import axios from "../services/instance";
export const apiHandle = ({ url, params }) => {
    return axios({
        url: `/api${url}`,
        params: {
            ...params,
        },
    });
};
