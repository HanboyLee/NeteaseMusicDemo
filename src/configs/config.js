const BASE_URL = "https://netease-cloud-api-sigma.vercel.app";
// export const API_URL = process.env.NODE_ENV === "development" ? "/api" : BASE_URL;
export const API_URL = process.env.NODE_ENV === "development" ? "/api" : "/api";
console.log(API_URL, process.env.NODE_ENV, "process.env.NODE_ENV");
export const API_TIMEOUT = 40000;
