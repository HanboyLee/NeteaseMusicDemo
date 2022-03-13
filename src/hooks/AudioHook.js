import { message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllSongsIdsTransforDetails, getSong, getSongs, saveInAudioLists } from "../app/features/singer/songSlice";
import { storageKey } from "../configs/constant";
import { getStorge } from "../services/storgeHelper";

const Context = React.createContext();
const AudioHook = ({ children }) => {
    const audioRef = React.useRef();

    // const [initSong, setInitSong] = React.useState({});
    const [audioInstance, setAudioInstance] = React.useState(null);

    //初始化;
    React.useEffect(() => {
        const initSognData = getStorge({ key: storageKey.TRACK_QUEUE_SONG });
        // console.log(initSognData, "initSognData");
        //過濾是否有相同音樂資料
        // dispatch(saveInAudioLists(initSognData));
        // setInitSong({ initSognData });
        // return () => setInitSong(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Context.Provider value={{ audioInstance, setAudioInstance, audioRef }}>{children}</Context.Provider>;
};

export const useAudioInstance = () => [
    React.useContext(Context).audioInstance,
    React.useContext(Context).setAudioInstance,
];
export const useAudioRef = () => React.useContext(Context).audioRef;

//播放全部
export const useOnSaveSongAllBtn = (isTooMuch) => {
    const dispatch = useDispatch();

    return async function (songlists) {
        try {
            if (!Array.isArray(songlists)) {
                throw new Error("獲取歌曲錯誤");
            }
            songlists = await Promise.resolve(isTooMuch ? getAllSongsIdsTransforDetails(songlists) : songlists);
            const ids = songlists.map((item) => item.id);
            //如果已經存在列表中就不添加
            // for (const item of audioLists) {
            //     if (ids.some((id) => id === item.id)) {
            //         return message.warning("歌曲已存在列表中");
            //     }
            // }
            // message.info("");
            dispatch(getSongs({ id: ids }, songlists));
        } catch (error) {
            message.error(error.message);
        }
    };
};

//單曲播放
export const useOnSavePlaySong = () => {
    const dispatch = useDispatch();
    const { audioLists } = useSelector((state) => state.song);
    return function (params) {
        try {
            if (!params) {
                throw new Error("獲取歌曲錯誤");
            }
            //如果已經存在列表中就不添加
            if (audioLists.some((item) => item.id === params.id)) {
                return message.warning("歌曲已存在列表中");
            }
            dispatch(getSong({ id: params.id }, params));
        } catch (error) {
            message.error(error.message);
        }
    };
};

export default AudioHook;
