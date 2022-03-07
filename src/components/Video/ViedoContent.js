import { LoadingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { getSingerMv } from "../../app/features/singer/singerDetailSlice";
import CommentContent from "../Comment/CommentContent";
import VideoImage from "../Image/VideoImage";
import Video from "./Video";

const ViedoContent = () => {
    const { singerId } = useParams();
    const continerRef = React.useRef();
    const dispatch = useDispatch();
    const { currentMv, loading } = useSelector((state) => state.singerDetail || "");
    React.useEffect(() => {
        if (singerId) {
            dispatch(getSingerMv([{ mvid: singerId }, { id: singerId }]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singerId]);
    const [mvDetailSet, commentSet, urlSet, mvRelated] = React.useMemo(() => currentMv || [], [currentMv]);

    if (!currentMv.length) {
        return <LoadingOutlined style={{ fontSize: continerRef.current?.offsetHeight || 0 }} />;
    }

    // console.log(mvDetailSet, commentSet, urlSet, mvRelated);

    return (
        <Contianer ref={continerRef}>
            <div style={{ flexBasis: "80%" }}>
                <Video loading={loading} imgSrc={mvDetailSet.cover} videoSrc={urlSet.url} />
                <MvInfoWrap>
                    <Typography.Title level={4}>{mvDetailSet.artistName}</Typography.Title>
                    <Typography.Title level={5}>
                        {mvDetailSet.name}
                        <PushTime>
                            <span>發布：{mvDetailSet.publishTime}</span>
                            <span style={{ marginLeft: "1rem" }}>
                                播放：<span style={{ color: "#f00" }}>{mvDetailSet.playCount}</span> 次
                            </span>
                        </PushTime>
                    </Typography.Title>

                    <div>
                        <span>{mvDetailSet.desc}</span>
                    </div>
                </MvInfoWrap>
                <CommentContent commentSet={commentSet} />
            </div>
            <div style={{ flex: 1, width: "20%" }}>
                <Typography.Title style={{ textAlign: "center" }} level={4}>
                    相关MV
                </Typography.Title>

                {mvRelated.map((item) => {
                    return (
                        <RelatedMVWrap key={item.id}>
                            <LinkItem to={`/singerPlayer/${item.id}`}>
                                <VideoImage {...item} />
                            </LinkItem>
                        </RelatedMVWrap>
                    );
                })}
            </div>
        </Contianer>
    );
};

const LinkItem = styled(Link)`
    display: inline-block;
    width: 100%;
`;
const RelatedMVWrap = styled.div`
    width: 100%;
    padding: 1rem;
`;
const Contianer = styled.div`
    width: 100%;
    display: flex;
`;

const MvInfoWrap = styled.div`
    width: 100%;
    padding: 1rem 0;
`;

const PushTime = styled.div`
    padding: 0 1rem;
    font-size: 1rem;
    color: #ccc;
    display: inline-block;
`;

export default ViedoContent;
