import { UpOutlined, DownOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import { Pagination, Tag } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getComment, setPagination } from "../../app/features/comment/commentSlice";
import { getAlbumList } from "../../app/features/singer/albumSlice";
import CommentContent from "../../components/Comment/CommentContent";
import Img from "../../components/Image/Img";
import Loading from "../../components/Loading";
import PlayListAllBtn from "../../components/PlaySong/PlayListAllBtn";
import { urlPath } from "../../configs/constant";
import Lists from "./Lists";

const Album = () => {
    const textRef = React.useRef();
    const { albumId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { commentList, loading: commentLoading, queryInfo, refreshComment } = useSelector((state) => state.comment);
    const { albumlists, album, loading } = useSelector((state) => state.album);

    const [fold, setFold] = React.useState(false);

    React.useEffect(() => {
        if (albumId) dispatch(getAlbumList({ id: albumId }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        dispatch(
            getComment({ id: albumId, offset: queryInfo.offset, timestamp: refreshComment }, urlPath.ALBUM_COMMENT)
        );
    }, [dispatch, queryInfo, albumId, refreshComment]);

    if (loading) {
        return <Loading />;
    }

    const onFold = () => {
        const str = textRef.current.textContent;
        const textlen = str.length > 1000;
        if (textlen && fold) {
            setFold(false);
            let newText = str.substring(0, 1000) + "...";
            textRef.current.textContent = newText;
        } else {
            setFold(true);
            textRef.current.textContent = album.description;
        }
    };

    const text = (str) => {
        const textlen = str.length > 1000;
        if (textlen) {
            let newText = str.substring(0, 1000) + "...";
            return newText;
        }
        return str;
    };

    const onNavigate = () => navigate(`/singer/${album.artist.id}`);

    //討論區分頁
    const onPagination = (current) => {
        dispatch(setPagination({ num: current, offset: (current - 1) * 20 }));
    };

    return (
        <Container>
            <div className="topInfoWarp">
                <div className="imgWrap">
                    <Img src={album.blurPicUrl} style={{ width: "100%", height: "100%" }} />
                </div>
                <div className="albumInfo">
                    <div className=" topInfo">
                        <Tag className="tag " color="magenta">
                            專輯
                        </Tag>
                        <span>：{album.name}</span>
                    </div>
                    <div className="topInfo navigate">
                        <Tag className="tag " color="magenta">
                            歌手
                        </Tag>
                        <span onClick={onNavigate}>
                            ：{album.artist.name}/{album.artist.alias[0]}
                        </span>
                    </div>
                    <div className=" topInfo">
                        <Tag className="tag " color="magenta">
                            發行時間
                        </Tag>
                        <span>：{moment(album.publishTime).format("yyyy-MM-DD")}</span>
                    </div>
                    <div className="topInfo">
                        <Tag className="tag " color="magenta">
                            發行公司
                        </Tag>
                        <span>：{album.company || "無"}</span>
                    </div>
                    <PlayListAllBtn datas={albumlists} />
                </div>
            </div>
            <div className="content">
                <p className="albumIntroduce">專輯介紹:</p>
                <FoldText ref={textRef} foldNum={fold ? "auto" : "300px"}>
                    {text(album.description)}
                </FoldText>

                {album.description.length > 900 && (
                    <div className="fold" onClick={onFold}>
                        {fold ? (
                            <>
                                收起
                                <UpOutlined />
                            </>
                        ) : (
                            <>
                                展開
                                <DownOutlined />
                            </>
                        )}
                    </div>
                )}
            </div>
            {/* 歌曲列表 */}
            <Lists datas={albumlists} />
            {/* 討論區 */}
            {!commentLoading && (
                <CommentWrap>
                    <CommentContent id={albumId} t={1} type={3} datas={commentList}>
                        <Pagination
                            style={{ textAlign: "center" }}
                            showLessItems
                            onChange={onPagination}
                            current={queryInfo.num}
                            total={commentList.total}
                            showSizeChanger={false}
                            pageSize={20}
                        />
                    </CommentContent>
                </CommentWrap>
            )}
        </Container>
    );
};
const CommentWrap = styled.div`
    margin-top: 3rem;
`;

const Container = styled.div`
    padding: 1rem 0;
    .topInfoWarp {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .imgWrap {
            flex-basis: 30%;
        }
        .albumInfo {
            flex-basis: 50%;
            color: #333;
            font-size: 1.2rem;
            letter-spacing: 0.2rem;
            .topInfo {
                padding: 0.5rem 0;
                .tag {
                    font-size: 1.2rem;
                }
            }
            .navigate > span + span {
                color: skyblue;
                transition: color 0.3s ease;
                cursor: pointer;
                :hover {
                    color: blue;
                }
            }
        }
    }
    .content {
        padding-top: 1rem;
        position: relative;
        .albumIntroduce {
            font-weight: 800;
        }
        .albumIntroduce + p {
            padding-left: 1.5rem;
        }
    }
    .fold {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #4c6deb;
        cursor: pointer;
    }
`;
const FoldText = styled.p`
    padding: 1rem;
    letter-spacing: 1px;
    line-height: 1.5;
    font-weight: 500;
`;

export default Album;
