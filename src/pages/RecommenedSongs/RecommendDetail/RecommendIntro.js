import styled from "@emotion/styled/macro";
import { Typography } from "antd";
import React from "react";

const RecommendIntro = ({ title, datas }) => {
    return (
        <BriefWrap>
            <Typography.Title level={4}>{title}</Typography.Title>
            <Typography.Paragraph>
                <CustomPre>{datas}</CustomPre>
            </Typography.Paragraph>
        </BriefWrap>
    );
};

const BriefWrap = styled.div`
    padding: 1rem;
    font-size: 1.1rem;
    letter-spacing: 1px;
`;
const CustomPre = styled.pre`
    padding: 1rem;
    font-size: 1.2rem;
    line-height: 1.8;
    letter-spacing: 1px;
`;
export default RecommendIntro;
