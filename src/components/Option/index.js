import React from "react";
import styled from "@emotion/styled/macro";
import OptionItem from "./OptionItem";
import { Tag } from "antd";

const Option = ({ Icon, title, data, category, ...rest }) => {
    return (
        <NavBarContainer>
            <Tag style={{ padding: ".5rem" }}>{title}:</Tag>
            <OptionBox>
                {data.map((item, i) => {
                    const isMatch = !!category && (category === item.id || category === item.name || category === item);
                    return <OptionItem data={item} isMatch={isMatch} key={item.id || i} {...rest} />;
                })}
            </OptionBox>
        </NavBarContainer>
    );
};

export default Option;

const NavBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 400px;
    padding: 0.5rem;
    & > span {
        font-size: 1.2rem;
        margin-right: 1rem;
        white-space: nowrap;
    }
`;
const OptionBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    white-space: nowrap;
    margin: 0.1rem 0;
`;
