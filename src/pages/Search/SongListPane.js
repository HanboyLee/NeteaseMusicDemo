import styled from "@emotion/styled/macro";
import { Col, Pagination, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import ImageCard from "../../components/Image/ImageCard";
import Loading from "../../components/Loading";
import { usePagination } from "./hooks";

const SongListPane = () => {
    const { songListData, loading } = useSelector((state) => state.search);
    const { onPagination, currentPage } = usePagination();
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <Row gutter={20}>
                {songListData.list.map((item) => {
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
            <PaginationWrap>
                <Pagination
                    showLessItems
                    onChange={onPagination}
                    current={currentPage}
                    total={songListData.total}
                    showSizeChanger={false}
                />
            </PaginationWrap>
        </>
    );
};
const ImageWrap = styled(Col)`
    margin-top: 1rem;
`;
const PaginationWrap = styled.div`
    margin-top: 1rem;
    text-align: center;
`;

export default SongListPane;
