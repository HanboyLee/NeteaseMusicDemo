import styled from "@emotion/styled/macro";
import { Col, Row, Typography } from "antd";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getMyPlayList } from "../../app/features/login/userListsSlice";
import ImageCard from "../../components/Image/ImageCard";
import { withLogin } from "../../hooks/UserHook";
import Loading from "../../components/Loading";
const MyMusic = () => {
    const dispatch = useDispatch();
    const {
        userInfo: { userId },
    } = useSelector((state) => state.login);
    const { playlist, loading } = useSelector((state) => state.userList);

    React.useEffect(() => {
        if (userId) dispatch(getMyPlayList({ uid: userId }));
    }, [userId, dispatch]);

    //過濾歌單方式
    const filterList = React.useCallback((bool) => playlist.filter((item) => item.subscribed === bool), [playlist]);
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <Container gutter={[10, 10]}>
                <Col md={24}>
                    <Typography.Title level={5}>创建的歌单({filterList(false).length})</Typography.Title>
                </Col>
                {filterList(false).map((item) => {
                    return (
                        <Col md={6} key={item.id}>
                            <ImageCard navigateTo={"recommenedSongs/"} picUrl={item.coverImgUrl} {...item} />
                        </Col>
                    );
                })}
            </Container>
            <Container gutter={[10, 10]}>
                <Col md={24}>
                    <Typography.Title level={5}>收藏的歌单({filterList(false).length})</Typography.Title>
                </Col>
                {filterList(true).map((item) => {
                    return (
                        <Col md={6} key={item.id}>
                            <ImageCard navigateTo={"recommenedSongs/"} picUrl={item.coverImgUrl} {...item} />
                        </Col>
                    );
                })}
            </Container>
        </>
    );
};
const Container = styled(Row)`
    width: 100%;
    padding: 1rem;
`;

export default withLogin(MyMusic);
