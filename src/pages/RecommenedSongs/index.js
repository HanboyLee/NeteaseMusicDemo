import styled from "@emotion/styled/macro";
import { Divider, Pagination } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRecommendTags, onClickCat, onCurrentChange } from "../../app/features/lasterList/recommendSongSlice";
import Loading from "../../components/Loading";
import Option from "../../components/Option";

import Lists from "./Lists";

const RecommenedSongs = () => {
    const dispatch = useDispatch();
    const { loading, tagbar, queryInfo, total } = useSelector((state) => state.recommendSong);

    React.useEffect(() => {
        dispatch(getRecommendTags());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (current) => {
        dispatch(onCurrentChange(current));
    };
    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            {/* 導覽 */}
            <div>
                {tagbar.map((item) => {
                    return (
                        <Option
                            key={item.id}
                            title={item.name}
                            data={item.tags}
                            category={queryInfo.cat}
                            onClick={onClickCat}
                        />
                    );
                })}
            </div>
            <Divider />
            <Lists queryInfo={queryInfo} />
            <PaginationWrap>
                <Pagination
                    showLessItems
                    onChange={onChange}
                    current={queryInfo.num}
                    total={total}
                    showSizeChanger={false}
                />
            </PaginationWrap>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    padding: 1rem;
`;
const PaginationWrap = styled.div`
    margin-top: 1rem;
    text-align: center;
`;

export default RecommenedSongs;
