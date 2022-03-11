import styled from "@emotion/styled/macro";
import { Button, Col, Row, Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singerDetailAsync } from "../../../app/features/singer/singerDetailSlice";
import { themeConstant } from "../../../configs/constant";

//components
import TabContent from "./TabContent";
import Image from "../../../components/Image/Img";
import Loading from "../../../components/Loading";
const SingerItem = (props) => {
    const { singerId } = useParams();
    const dispatch = useDispatch();
    const { singerDetail, desc, albums, mvs, simi, topSong50, loading } = useSelector((state) => state.singerDetail);
    React.useEffect(() => {
        dispatch(singerDetailAsync({ id: singerId }));
    }, [singerId, dispatch]);

    const onCollectToProfile = (e) => {
        console.log(onCollectToProfile);
    };
    if (loading) {
        return <Loading />;
    }
    return (
        <Container>
            <Row style={{ height: "100%" }} gutter={[30, 20]}>
                <StyleCol xs={24}>
                    <div style={{ width: "800px", margin: "0 auto" }}>
                        <ImgBox>
                            <Img
                                preview={false}
                                src={singerDetail?.artist?.cover + "?param=800y300?param=640y300"}
                                alt={singerDetail?.artist?.briefDesc}
                            />
                            <CollectBtn onClick={onCollectToProfile} danger type="ghost">
                                收藏
                            </CollectBtn>
                        </ImgBox>
                        <Introduce>
                            <Text strong type={"danger"}>
                                歌手： {singerDetail.artist?.name}
                            </Text>

                            <Text level={3}>专辑：{singerDetail.artist?.albumSize}</Text>
                            <Text level={3}>歌曲：{singerDetail.artist?.musicSize}</Text>
                            <Text level={3}>MV：{singerDetail.artist?.mvSize}</Text>
                        </Introduce>
                        <TabContent
                            topSong50={topSong50}
                            artist={singerDetail.artist}
                            desc={desc}
                            albums={albums}
                            mvs={mvs}
                            simi={simi}
                        />
                    </div>
                </StyleCol>
                <StyleCol xs={24}></StyleCol>
                {/* <StyleCol xs={24}>1</StyleCol> */}
            </Row>
        </Container>
    );
};

const Introduce = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem 0;
`;

const CollectBtn = styled(Button)`
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    &:hover {
        box-shadow: ${({ theme }) => theme[themeConstant.boxShadowBase]};
    }
`;

const ImgBox = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Text = styled(Typography.Text)`
    padding: 1rem 0;
    font-size: 1.5rem;
`;

const Img = styled(Image)`
    margin: 0 auto;
    display: block;
`;

const StyleCol = styled(Col)`
    padding-top: 1.2rem;
`;

const Container = styled.div`
    height: 100%;
`;
export default SingerItem;
