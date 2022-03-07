import { createSlice, current } from "@reduxjs/toolkit";
import { message } from "antd";
import { storageKey, urlPath } from "../../../configs/constant";
import { apiHandle } from "../../../services/apiUtils";
import { setStorge } from "../../../services/storgeHelper";
import { transSongs } from "./utils";

const initialState = {
    song: {},
    loading: true,
    audioLists: [],
    clickIndex: 0,
};

export const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        getSongByAmount(state, action) {
            const payload = action.payload;
            // songInfo
            // 記錄最後一筆點擊資料
            setStorge({
                key: storageKey.TRACK_QUEUE_SONG,
                value: { ...payload },
            });

            return {
                ...state,
                loading: false,
                audioLists: [...state.audioLists, payload],
            };
        },
        setSongsByAmount(state, action) {
            const payload = action.payload;

            setStorge({
                key: storageKey.TRACK_QUEUE_SONG,
                value: { ...payload[payload.length - 1] },
            });
            return {
                ...state,
                audioLists: action.payload,
            };
        },
        saveInAudioLists(state, action) {
            // return {
            //     ...state,
            //     audioLists: [action.payload, ...state.audioLists],
            // };
        },
        updateAudioList(state, action) {
            return {
                ...state,
                audioLists: action.payload,
            };
        },
    },
});

export const { getSongByAmount, saveInAudioLists, updateAudioList, setSongsByAmount, setCurrentLyric } =
    songSlice.actions;

export const getSong = (param, songInfo) => async (dispatch) => {
    try {
        const params = {
            ...param,
            realIP: "116.25.146.177",
        };

        const [{ data }, { lrc: songLrc }] = await Promise.all([
            apiHandle({ url: urlPath.SONG_URL, params }),
            apiHandle({ url: urlPath.SONG_LYRIC, params }),
        ]);
        dispatch(getSongByAmount(transSongs({ songUrl: data[Object.keys(data)], songInfo, songLrc })));
    } catch (error) {
        console.log(error, "getSong");
    }
};
export const getSongs = (param, songInfo) => async (dispatch) => {
    try {
        message.loading("正在为您添加歌曲");

        const params = {
            id: param.id.join(","),
            realIP: "116.25.146.177",
        };
        // 歌曲url
        const { data } = await apiHandle({ url: urlPath.SONG_URL, params });
        // const extractData = data.filter((item) => item.url);
        //FIXME:（一次取太多api會導致效能降低）
        //歌詞
        // const lyric = await Promise.all(
        //     param.id.map((item) => apiHandle({ url: urlPath.SONG_LYRIC, params: { id: item } }))
        // );

        // const extractLyric = lyric.map((item) => item.lrc);
        // 進行id比對排序
        let songsData = [];
        for (let i = 0; i < param.id.length; i++) {
            for (let j = 0; j < data.length; j++) {
                param.id[i] === data[j].id && songsData.push(data[j]);
            }
        }

        let newMap = [];
        for (let i = 0; i < songsData.length; i++) {
            newMap.push({
                songInfo: songInfo[i],
                songUrl: songsData[i],
                // songLrc: extractLyric[i],
                songLrc: [],
            });
        }

        // 過濾沒有地址的音樂資料
        const datas = transSongs(newMap);
        message.success("添加成功");
        dispatch(setSongsByAmount(datas));
    } catch (error) {
        console.log(error, "getSong");
    }
};

export const getLyric = async (params) => {
    const { lrc: songLrc } = await apiHandle({ url: urlPath.SONG_LYRIC, params });
    return songLrc;
};

export const getAllSongsIdsTransforDetails = async (orginIds) => {
    const ids = orginIds.map((item) => item.id).join(",");
    const { songs } = await apiHandle({
        url: urlPath.TOPLIST_SONG_DETAIL,
        params: {
            ids,
        },
    });
    return songs;
};
export default songSlice.reducer;
