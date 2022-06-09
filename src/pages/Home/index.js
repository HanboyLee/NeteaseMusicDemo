import styled from '@emotion/styled/macro';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getPersonalizedList } from '../../app/features/discover/personalizedSlice';

import Img from '../../components/Image/Img';
import { Col, Row, Typography } from 'antd';
import { themeConstant } from '../../configs/constant';
import Banner from './Banner';
import ImageCard from '../../components/Image/ImageCard';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useOnSavePlaySong } from '../../hooks/AudioHook';
import VideoImage from '../../components/Image/VideoImage';
import Loading from '../../components/Loading';

const Home = () => {
    const dispatch = useDispatch();
    const onSavePlaySong = useOnSavePlaySong();
    const { loading, bannerList, personalized, newsong, privatecontent, mv } = useSelector(
        (state) => state.personalized
    );
    React.useEffect(() => {
        dispatch(getPersonalizedList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            {/* Swiper */}
            <Banner bannerList={bannerList} />
            {/* 推荐歌单 */}
            <CommenContent>
                <LinkTitleWrap to={'/recommenedSongs'}>
                    <Typography.Title level={5} className={'title'}>
                        推荐歌单
                        <RightOutlined />
                    </Typography.Title>
                </LinkTitleWrap>
                <Row gutter={[30, 10]}>
                    {/* title */}
                    {personalized?.map((item) => {
                        return (
                            <Col key={item?.id} md={4}>
                                <ImageCard navigateTo={'recommenedSongs/'} {...item} />
                            </Col>
                        );
                    })}
                </Row>
            </CommenContent>
            {/* 獨家放送 */}
            <CommenContent>
                <LinkTitleWrap to={'/recommenedSongs'}>
                    <Typography.Title level={5} className={'title'}>
                        {privatecontent?.name}
                        <RightOutlined />
                    </Typography.Title>
                </LinkTitleWrap>
                <Row gutter={[30, 10]}>
                    {/* title */}
                    {privatecontent?.result?.map((item) => {
                        return (
                            <Col key={item.id} md={8}>
                                <ImageCard navigateTo={'recommenedSongs/'} {...item} />
                            </Col>
                        );
                    })}
                </Row>
            </CommenContent>
            {/* 最新音乐 */}
            <CommenContent>
                <LinkTitleWrap to={'/newSong'} replace={true}>
                    <Typography.Title level={5} className={'title'}>
                        最新音乐
                        <RightOutlined />
                    </Typography.Title>
                </LinkTitleWrap>
                <Row gutter={[30, 20]}>
                    {newsong?.map((item) => {
                        return (
                            <Col key={item?.id} md={6} onClick={() => onSavePlaySong(item)}>
                                <SongsWrap>
                                    <div className="imgWrap">
                                        <Img src={item?.picUrl} />
                                    </div>
                                    <div className="SongText">
                                        <h4>{item?.name}</h4>
                                        <div>{item?.song?.album?.artists?.[0]?.name}</div>
                                    </div>
                                </SongsWrap>
                            </Col>
                        );
                    })}
                </Row>
            </CommenContent>
            {/* 最新热门MV推荐 */}
            <CommenContent>
                <LinkTitleWrap to={'/hotMv'} replace={true}>
                    <Typography.Title level={5} className={'title'}>
                        最新热门MV推荐
                        <RightOutlined />
                    </Typography.Title>
                </LinkTitleWrap>
                <Row gutter={[30, 20]}>
                    {mv?.map((item) => {
                        return (
                            <Col key={item?.id} md={6}>
                                <Link to={`/mvPlayer/${item.id}`}>
                                    <VideoImage name={item?.artistName} cover={item?.picUrl} {...item} />
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
            </CommenContent>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
`;

const CommenContent = styled.div`
    width: 100%;
    padding-top: 1rem;
    .title {
        display: inline-block;
        margin: 1rem 0;
        color: ${({ theme }) => theme[themeConstant.textColor]};
    }
`;

const LinkTitleWrap = styled(Link)`
    color: unset;
    & .title:hover {
        color: ${({ theme }) => theme[themeConstant.textColorSecondary]};
    }
`;

const SongsWrap = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    cursor: pointer;
    border-radius: ${({ theme }) => theme[themeConstant.borderRadiusBase]};
    overflow: hidden;

    box-shadow: ${({ theme }) => theme[themeConstant.boxShadowBase]};
    & .imgWrap {
        width: 100px;
    }
    & .SongText {
        flex: 1;
        text-align: center;
        padding: 0.5rem;
    }
`;

export default Home;
