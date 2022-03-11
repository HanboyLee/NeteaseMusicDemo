import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { updateAudioList } from "../../app/features/singer/songSlice";
import { getStorge } from "../../services/storgeHelper";
import { storageKey } from "../../configs/constant";
import { useAudioRef } from "../../hooks/AudioHook";
const PlayerBar = ({ url }) => {
    const { audioLists } = useSelector((state) => state.song);

    const audioRef = useAudioRef();
    const dispatch = useDispatch();
    // const initialSong = React.useMemo(() => {
    //     const init = getStorge({ key: storageKey.TRACK_QUEUE_SONG });
    //     return init ? [init] : [];
    // }, []);
    const onAudioListsChange = (_, list) => {
        //TODO: 移除或搬移都會影響歌單重新載入
        dispatch(updateAudioList(list));
        // audioRef.current.updatePlayIndex(list.length - 1);
    };

    return (
        <ReactJkMusicPlayer
            autoPlayInitLoadPlayList={true}
            quietUpdate={true}
            clearPriorAudioLists={true}
            showLyric={false}
            audioLists={audioLists || []}
            getAudioInstance={(inc) => (audioRef.current = inc)}
            showDownload={false}
            locale={"zh_CN"}
            onAudioListsChange={onAudioListsChange}
        />
    );
};

export default PlayerBar;
