import React from "react";
import { Card } from "antd";
import styled from "@emotion/styled/macro";
import { themeConstant } from "../../configs/constant";

const CardItem = () => {
    const { Meta } = Card;

    return (
        <>
            <CustomCard
                loading={false}
                style={{ width: 200 }}
                bordered
                cover={
                    !false && (
                        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    )
                }
            >
                <Meta title="CustomCard title" description="This is the description" />
            </CustomCard>
        </>
    );
};

const CustomCard = styled(Card)`
    cursor: pointer;
    transition: all 0.3s ease-in;
    &:hover {
        box-shadow: ${({ theme }) => theme[themeConstant.boxShadowBase]};
    }
`;

export default CardItem;
