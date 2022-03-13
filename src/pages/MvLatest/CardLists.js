import styled from "@emotion/styled/macro";
import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import VideoImage from "../../components/Image/VideoImage";
import Loading from "../../components/Loading";

const CardLists = ({ datas, loading }) => {
    if (loading) {
        return <Loading />;
    }
    return (
        <Row>
            {datas.map((item) => {
                return (
                    <MVWrap key={item.id} md={6}>
                        <LinkItem to={`/mvPlayer/${item.id}`}>
                            <VideoImage {...item} />
                        </LinkItem>
                    </MVWrap>
                );
            })}
        </Row>
    );
};
const LinkItem = styled(Link)`
    display: inline-block;
    width: 100%;
`;
const MVWrap = styled(Col)`
    width: 100%;
    padding: 1rem;
`;
export default CardLists;
