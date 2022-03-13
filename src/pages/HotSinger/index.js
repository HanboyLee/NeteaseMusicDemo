import { FieldTimeOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import { Col, Row, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import "moment/locale/zh-cn";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTopList, getTopPlayListDetail } from "../../app/features/toplist/topListSlice";

//components
import Img from "../../components/Image/Img";
import Loading from "../../components/Loading";
import MusicTableList from "../../components/MusicTableList";
import PlayListAllBtn from "../../components/PlaySong/PlayListAllBtn";
import { extractPlayCountHandle } from "../../utils/common";

const HotSinger = () => {
    const {
        list,
        playlist: { playlist },
        loading,
    } = useSelector((state) => state.topList);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getTopList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <Loading />;
    }
    const onClick = ({ id }) => {
        dispatch(getTopPlayListDetail({ id }));
    };

    return (
        <Container style={{ width: "100%", display: "flex" }}>
            {/* sider Bar */}
            <SiderBarContainer>
                <Content>
                    {list.map((item, i) => {
                        const navTitle =
                            i === 0 ? (
                                <TitleCategory level={5}>云音乐特色榜</TitleCategory>
                            ) : i === 4 ? (
                                <TitleCategory level={5}>全球媒体榜</TitleCategory>
                            ) : null;
                        return (
                            <React.Fragment key={item.id}>
                                {navTitle}
                                <SiderBar onClick={() => onClick({ id: item.id })} key={item.id}>
                                    <div className="imgwrap">
                                        <Img src={item?.coverImgUrl} />
                                    </div>
                                    <div className="titleWrap">
                                        <div>{item?.name}</div>
                                        <div>{item?.updateFrequency}</div>
                                    </div>
                                </SiderBar>
                            </React.Fragment>
                        );
                    })}
                </Content>
            </SiderBarContainer>
            {/* 內容 */}

            <TableContainer>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flexBasis: "30%" }}>
                        <Img src={playlist?.coverImgUrl} alt={playlist?.description} />
                    </div>
                    <div style={{ flex: 1, padding: `1rem` }}>
                        {/* title */}
                        <Title>{playlist?.name}</Title>
                        {/* description */}
                        <div className="description">{playlist.description} </div>
                        {/* 更新日期 */}
                        <div>
                            <FieldTimeOutlined className="iconTime" />
                            {moment(playlist?.updateTime).calendar()}
                        </div>
                        {/* 播放全部 */}
                        <PlayListAllBtn datas={playlist.tracks} />
                    </div>
                </div>
                {/* 歌曲列表 */}
                <Row style={{ padding: "0.5rem" }}>
                    <Col md={4}>
                        <Typography.Title className="songTitle" level={4}>
                            歌曲列表
                        </Typography.Title>
                    </Col>

                    <Col md={4} className="songText">
                        订阅
                        <span style={{ color: "#f00" }}> {playlist?.subscribedCount} </span>人
                    </Col>
                    <Col md={4} className="songText">
                        讨论
                        <span style={{ color: "#f00" }}> {playlist?.commentCount} </span> 次
                    </Col>
                    <Col md={4} className="songText">
                        分享
                        <span style={{ color: "#f00" }}> {playlist?.shareCount} </span>次
                    </Col>
                    <Col md={4} className="songText ">
                        播放:
                        <span style={{ color: "#f00" }}> {extractPlayCountHandle(playlist?.playCount)} </span>次
                    </Col>
                </Row>
                <div style={{ width: "100%" }}>
                    <MusicTableList loading={loading} datas={playlist.tracks} />
                </div>
            </TableContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    width: 100%;
`;

const TableContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    & .songTitle {
        margin: 0 !important;
    }
    & .songText {
        line-height: 2;
    }

    & .iconTime {
        margin-right: 0.5rem;
    }
    & .description {
        color: #111;
        padding: 0.5rem 0;
        letter-spacing: 1px;
    }
`;

const SiderBarContainer = styled.div`
    height: 90vh;
    width: 200px;
    position: relative;
    /* overflow: hidden; */
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const Content = styled.div`
    position: absolute;
    left: 0;
`;

const SiderBar = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    margin-left: 10px;
    cursor: pointer;
    width: 100%;
    & .imgwrap {
        width: 40px;
    }
    & .titleWrap {
        margin-left: 0.5rem;
    }
    & .titleWrap :nth-of-type(1) {
        font-weight: 800;
    }
    & .titleWrap :nth-of-type(2) {
        color: #888;
    }
`;

const TitleCategory = styled(Title)`
    letter-spacing: 2px;
    padding: 1rem 0 0.5rem;
`;

export default HotSinger;
