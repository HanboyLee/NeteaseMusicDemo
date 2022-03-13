import React from "react";
import PlayCircle from "../../asset/Icons/play-circle.svg";
import PlayUnhover from "../../asset/Icons/play-unhover.svg";
import styled from "@emotion/styled/macro";
import { useOnSavePlaySong } from "../../hooks/AudioHook";

const PlaySongIcon = (params) => {
    const onSavePlaySong = useOnSavePlaySong();
    return (
        <PlayIcon
            hover
            onClick={() => {
                onSavePlaySong(params);
            }}
        />
    );
};
export default PlaySongIcon;

const PlayIcon = styled.div`
    cursor: pointer;
    margin: 0 auto;
    width: 40px;
    height: 40px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: ${() => `url(${PlayUnhover})`};
    transition: background-image 0.5s ease;
    &:hover {
        background-image: ${() => `url(${PlayCircle})`};
    }
`;
