import { FieldTimeOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import "moment/locale/zh-cn";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTopList, getTopPlayListDetail } from "../../app/features/toplist/topListSlice";

//components
import Img from "../../components/Image/Img";
import MusicTableList from "../../components/MusicTableList";
import PlayListAllBtn from "../../components/PlaySong/PlayListAllBtn";

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
        return <div>Loading...</div>;
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
                        {/* 更新日期 */}
                        <div>
                            <span>
                                <FieldTimeOutlined />
                            </span>
                            {moment(playlist?.updateTime).calendar()}
                        </div>
                        {/* 播放全部 */}
                        <PlayListAllBtn datas={playlist.tracks} />
                    </div>
                </div>
                {/* 歌曲列表 */}
                <Row style={{ padding: "0.5rem" }}>
                    <Col md={4}>
                        <div style={{ fontSize: "1.5rem" }}>歌曲列表</div>
                    </Col>
                    <Col md={14} style={{ lineHeight: "2" }}>
                        {playlist?.trackCount}首歌
                    </Col>
                    <Col md={6} style={{ lineHeight: "2" }}>
                        播放:<span style={{ color: "#f00" }}> {playlist?.playCount}</span>次
                    </Col>
                </Row>
                <div style={{ width: "100%" }}>
                    <MusicTableList datas={playlist.tracks} />
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
