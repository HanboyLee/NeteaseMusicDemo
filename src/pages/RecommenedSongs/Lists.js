import styled from "@emotion/styled/macro";
import { Col, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendList } from "../../app/features/lasterList/recommendSongSlice";
import ImageCard from "../../components/Image/ImageCard";
import Loading from "../../components/Loading";

const Lists = ({ queryInfo }) => {
    const { listLoading, recommendList } = useSelector((state) => state.recommendSong);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getRecommendList(queryInfo));
    }, [queryInfo, dispatch]);

    if (listLoading) {
        return <Loading />;
    }

    return (
        <Container>
            <Row gutter={20}>
                {recommendList.map((item) => {
                    return (
                        <ImageWrap md={6} key={item.id}>
                            <ImageCard
                                navigateTo={"recommenedSongs/"}
                                id={item.id}
                                picUrl={item.coverImgUrl}
                                name={item.name}
                            />
                        </ImageWrap>
                    );
                })}
            </Row>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
`;
const ImageWrap = styled(Col)`
    margin-top: 1rem;
`;

export default Lists;
