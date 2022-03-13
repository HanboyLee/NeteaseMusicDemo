import styled from "@emotion/styled/macro";
import { Col, Row } from "antd";
import React from "react";
import VideoImage from "../../../components/Image/VideoImage";
import { Link } from "react-router-dom";

const MvTabContent = ({ datas }) => {
    return (
        <Contianer gutter={[10, 20]}>
            {datas.map((item) => {
                return (
                    <VideoBox key={item.id} xs={24} md={8}>
                        <LinkItem to={`/mvPlayer/${item.id}`}>
                            <VideoImage {...item} />
                        </LinkItem>
                    </VideoBox>
                );
            })}
        </Contianer>
    );
};
const VideoBox = styled(Col)`
    width: 100%;
`;
const Contianer = styled(Row)`
    width: 100%;
`;

const LinkItem = styled(Link)`
    display: inline-block;
    width: 100%;
`;
export default MvTabContent;
