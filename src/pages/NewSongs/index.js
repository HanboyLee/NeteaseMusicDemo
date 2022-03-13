import styled from "@emotion/styled/macro";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getNewSongsList, onClickArea } from "../../app/features/lasterList/newSongsSlice";

//components
import MusicTableList from "../../components/MusicTableList";
import Option from "../../components/Option";

const NewSongs = () => {
    const { TarBarArea, queryInfo, songsList, loading } = useSelector((state) => state.newSongs);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getNewSongsList(queryInfo));
    }, [queryInfo, dispatch]);

    return (
        <Container>
            <Option title={"地区"} data={TarBarArea} category={queryInfo.type} onClick={onClickArea} />

            <TableWrap>
                <MusicTableList loading={loading} datas={songsList} />
            </TableWrap>
        </Container>
    );
};
const Container = styled.div`
    width: 100%;
`;

const TableWrap = styled.div`
    width: 100%;
    padding-top: 1rem;
`;

export default NewSongs;
