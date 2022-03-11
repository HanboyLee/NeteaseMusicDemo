import styled from "@emotion/styled/macro";
import { Col, Pagination, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VideoImage from "../../components/Image/VideoImage";
import Loading from "../../components/Loading";
import { usePagination } from "./hooks";

const MvPane = () => {
    const { loading, mvData } = useSelector((state) => state.search);
    const { onPagination, currentPage } = usePagination();
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <Row gutter={[30, 20]}>
                {mvData.list.map((item) => {
                    return (
                        <Col md={6} key={item.id}>
                            <Link to={`/singerPlayer/${item.id}`}>
                                <VideoImage key={item.id} {...item} />
                            </Link>
                        </Col>
                    );
                })}
            </Row>
            <PaginationWrap>
                <Pagination
                    showLessItems
                    onChange={onPagination}
                    current={currentPage}
                    total={mvData.total}
                    showSizeChanger={false}
                />
            </PaginationWrap>
        </>
    );
};

const PaginationWrap = styled.div`
    margin-top: 1rem;
    text-align: center;
`;
export default MvPane;
