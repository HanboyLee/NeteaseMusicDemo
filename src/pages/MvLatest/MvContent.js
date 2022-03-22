import { LoadingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import { Pagination, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getComment, setPagination } from "../../app/features/comment/commentSlice";

import { getSingerMv } from "../../app/features/singer/singerDetailSlice";
import { urlPath } from "../../configs/constant";
import CommentContent from "../../components/Comment/CommentContent";
import VideoImage from "../../components/Image/VideoImage";
import Video from "../../components/Video/Video";

const MvContent = () => {
    const { mvId } = useParams();
    const containerRef = React.useRef();
    const dispatch = useDispatch();
    const { currentMv, loading } = useSelector((state) => state.singerDetail || "");

    const { commentList, loading: commentLoading, queryInfo, refreshComment } = useSelector((state) => state.comment);

    React.useEffect(() => {
        if (mvId) {
            dispatch(getSingerMv([{ mvid: mvId }, { id: mvId, realIP: "116.25.146.177" }]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mvId]);

    //監聽評論發文
    React.useEffect(() => {
        dispatch(getComment({ id: mvId, offset: queryInfo.offset, timestamp: refreshComment }, urlPath.MV_COMMENT));
    }, [dispatch, queryInfo, mvId, refreshComment]);

    const [mvDetailSet, urlSet, mvRelated] = React.useMemo(() => currentMv || [], [currentMv]);

    if (!currentMv.length) {
        return <LoadingOutlined style={{ fontSize: containerRef.current?.offsetHeight || 0 }} />;
    }

    //評論分頁
    const onPagination = (current) => {
        dispatch(setPagination({ num: current, offset: (current - 1) * 20 }));
    };

    return (
        <Contianer ref={containerRef}>
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
                {/* 評論區 */}
                {!commentLoading && (
                    <CommentContent id={mvId} t={1} type={1} datas={commentList}>
                        <Pagination
                            style={{ textAlign: "center" }}
                            showLessItems
                            onChange={onPagination}
                            current={queryInfo.num}
                            total={commentList?.total ?? 0}
                            showSizeChanger={false}
                            pageSize={20}
                        />
                    </CommentContent>
                )}
            </div>
            {/* 側邊欄相關ＭＶ */}
            <div style={{ flex: 1, width: "20%" }}>
                <Typography.Title style={{ textAlign: "center" }} level={4}>
                    相关MV
                </Typography.Title>
                {mvRelated.map((item) => {
                    return (
                        <RelatedMVWrap key={item.id}>
                            <LinkItem to={`/mvPlayer/${item.id}`}>
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

export default MvContent;
