import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { Tag, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecommendDeatil } from "../../../app/features/lasterList/recommendSongSlice";
import { themeConstant } from "../../../configs/constant";
import { extractPlayCountHandle } from "../../../utils/common";

//Components
import Img from "../../../components/Image/Img";
import Loading from "../../../components/Loading";
import PlayListAllBtn from "../../../components/PlaySong/PlayListAllBtn";
import RecommendCollect from "./RecommendCollect";
import RecommendComment from "./RecommendComment";
import RecommendIntro from "./RecommendIntro";
import RecommendList from "./RecommendList";

const tagColor = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];

const RecommendDetail = () => {
    const [currentActive, setCurrentActive] = React.useState(1);
    const { recommenedId } = useParams();
    const { detailLoading, playDeatail } = useSelector((state) => state.recommendSong);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getRecommendDeatil({ id: recommenedId }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (detailLoading) {
        return <Loading />;
    }

    const tabsDatas = [
        {
            id: 1,
            tagTile: `歌曲列表 (${playDeatail.trackCount})`,
            Comp: <RecommendList trackIds={playDeatail.trackIds} />,
        },
        { id: 2, tagTile: "簡介", Comp: <RecommendIntro datas={playDeatail.description} title={playDeatail.name} /> },
        { id: 3, tagTile: `评论列表 (${playDeatail.commentCount})`, Comp: <RecommendComment id={recommenedId} /> },
        {
            id: 4,
            tagTile: `收藏者`,
            Comp: <RecommendCollect songslistId={playDeatail.id} />,
        },
    ];

    return (
        <Container>
            {/* Header */}
            <DetailContainer>
                <ImageWrap>
                    <Img src={playDeatail.coverImgUrl} />
                </ImageWrap>
                <div className="HeaderRightContainer">
                    {/* 歌單名稱 */}
                    <SongsTitle type="danger" level={5}>
                        <span>歌單:</span>
                        {playDeatail.name}
                    </SongsTitle>

                    {/* 建立者 */}
                    <DeatilCreateWrap css={commonStyle}>
                        <Avatar style={{ width: 50, height: 50 }} src={<Img src={playDeatail.creator?.avatarUrl} />} />
                        <div>{playDeatail.creator.nickname}</div>
                        <div>{moment(playDeatail.creator.createTime).format("YYYY/MM/DD")}创建</div>
                    </DeatilCreateWrap>
                    {/* 標籤 */}
                    {playDeatail?.creator?.expertTags && (
                        <TagsWrap css={commonStyle}>
                            <span>标签:</span>
                            {playDeatail?.creator?.expertTags?.map((item, i) => (
                                <Tag color={tagColor[i]} key={i}>
                                    {item}
                                </Tag>
                            ))}
                        </TagsWrap>
                    )}

                    <SongsInfo css={commonStyle}>
                        <span>歌曲:{playDeatail.trackCount} 首</span>
                        <span>播放次数:{extractPlayCountHandle(playDeatail.playCount)} </span>
                    </SongsInfo>
                    {/* 播放全部 */}

                    <PlayListAllBtn isTooMuch={true} datas={playDeatail.trackIds} />
                </div>
            </DetailContainer>
            {/* 標籤切換 */}
            <div css={commonStyle}>
                {tabsDatas.map((item) => {
                    return (
                        <TagWrap
                            onClick={() => setCurrentActive(item.id)}
                            key={item.id}
                            color={currentActive === item.id && "blue"}
                        >
                            {item.tagTile}
                        </TagWrap>
                    );
                })}
            </div>
            {/* 內容 */}
            <div css={commonStyle}>{tabsDatas[currentActive - 1].Comp}</div>
        </Container>
    );
};

const commonStyle = css`
    margin-top: 1rem;
    margin-left: 0.3rem;
`;
const SongsTitle = styled(Typography.Title)``;

const TagWrap = styled(Tag)`
    font-size: 1.1rem;
    padding: 0.5rem;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
`;

const ImageWrap = styled.div`
    min-width: 200px;
    max-width: 300px;
    border-radius: ${({ theme }) => theme[themeConstant.borderRadiusBase]};
    overflow: hidden;
`;
const DetailContainer = styled.div`
    display: flex;
    justify-content: center;
    & .HeaderRightContainer {
        flex: 1;
        padding-left: 2rem;
    }
`;
const DeatilCreateWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const TagsWrap = styled.div`
    & > span {
        font-size: 1.2rem;
        padding: 0.3rem;
    }
`;
const SongsInfo = styled.div`
    & > :nth-of-type(1) {
        margin-right: 1rem;
    }
`;

export default RecommendDetail;
