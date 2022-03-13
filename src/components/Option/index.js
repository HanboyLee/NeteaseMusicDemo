import React from "react";
import styled from "@emotion/styled/macro";
import OptionItem from "./OptionItem";
import { Tag } from "antd";

const Option = ({ Icon, title, data, category, ...rest }) => {
    return (
        <NavBarContainer>
            {title && <Tag style={{ padding: ".5rem" }}>{title}:</Tag>}
            <OptionBox>
                {data.map((item, i, arr) => {
                    const isMatch = !!category && (category === item.id || category === item.name || category === item);
                    //  最後一欄不出現後綴
                    const suffix = arr.length - 1 !== i && "|";
                    return (
                        <React.Fragment key={item.id || i}>
                            <OptionItem data={item} isMatch={isMatch} {...rest} />
                            {suffix}
                        </React.Fragment>
                    );
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
