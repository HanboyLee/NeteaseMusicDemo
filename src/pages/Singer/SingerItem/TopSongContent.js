import styled from "@emotion/styled/macro";
import React from "react";
import { getAlbum } from "../../../app/features/singer/singerDetailSlice";
import MusicTableList from "../../../components/MusicTableList";
import PlayListAllBtn from "../../../components/PlaySong/PlayListAllBtn";

const TopSongContent = ({ datas, ...props }) => {
    return (
        <>
            <BtnWrap>
                <PlayListAllBtn datas={datas} />
            </BtnWrap>
            <MusicTableList datas={datas} />
        </>
    );
};

const BtnWrap = styled.div`
    padding: 1rem;
`;
export default TopSongContent;
