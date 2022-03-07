import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { getLyric, saveInAudioLists, updateAudioList } from "../../app/features/singer/songSlice";
import { getStorge } from "../../services/storgeHelper";
import { storageKey } from "../../configs/constant";
import { useAudioInstance, useAudioRef } from "../../hooks/AudioHook";
import { set } from "nprogress";
const PlayerBar = ({ url }) => {
    const { loading, audioLists } = useSelector((state) => state.song);
    const [audioInstance, setAudioInstance] = useAudioInstance();

    const audioRef = useAudioRef();
    const dispatch = useDispatch();
    // const initialSong = React.useMemo(() => {
    //     const init = getStorge({ key: storageKey.TRACK_QUEUE_SONG });
    //     return init ? [init] : [];
    // }, []);
    const onAudioListsChange = (_, list) => {
        //TODO: 移除或搬移都會影響歌單重新載入
        dispatch(updateAudioList(list));
        audioRef.current.updatePlayIndex(list.length - 1);
    };

    const lists = React.useMemo(() => audioLists || [], [audioLists]);
    console.log(lists);
    return (
        <ReactJkMusicPlayer
            autoPlayInitLoadPlayList={true}
            quietUpdate={true}
            clearPriorAudioLists={true}
            showLyric={false}
            audioLists={lists}
            getAudioInstance={(inc) => (audioRef.current = inc)}
            showDownload={false}
            locale={"zh_CN"}
            onAudioListsChange={onAudioListsChange}
        />
    );
};

export default PlayerBar;
