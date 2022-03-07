import styled from "@emotion/styled/macro";
import { Typography } from "antd";
import React from "react";

const IntroContent = (props) => {
    return (
        <Container>
            {/* 簡介 */}
            <IntroCom title={"简介"} desc={props.briefDesc} />
            {/* 經歷 */}
            {props.datas.introduction.map((item, i) => (
                <IntroCom key={i} title={item.ti} desc={item.txt} />
            ))}
        </Container>
    );
};

const IntroCom = ({ title, desc }) => {
    return (
        <BriefWrap>
            <Typography.Title level={4}>{title}</Typography.Title>
            <Typography.Paragraph
                ellipsis={{
                    expandable: true,
                    rows: 30,
                }}
            >
                <CustomPre>{desc}</CustomPre>
            </Typography.Paragraph>
        </BriefWrap>
    );
};

const Container = styled.div`
    padding: 1rem 0;
`;

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
export default IntroContent;
