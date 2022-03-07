import styled from "@emotion/styled/macro";
import React from "react";
import { useDispatch } from "react-redux";
import { themeConstant } from "../../configs/constant";
import clsx from "clsx";

const OptionItem = ({ data, isMatch, onClick }) => {
    const dispatch = useDispatch();

    return (
        <Option onClick={() => dispatch(onClick(data.id ?? data.name ?? data))} className={clsx(isMatch && "active")}>
            {data.name || data}
        </Option>
    );
};

const Option = styled.div`
    font-size: 1.1rem;
    padding: 0.5rem;
    cursor: pointer;
    white-space: nowrap;
    color: ${({ theme }) => theme[themeConstant.textColorSecondary]};
    &:hover {
        color: ${({ theme }) => theme[themeConstant.linkColor]};
    }
    &.active {
        color: ${({ theme }) => theme[themeConstant.linkColor]};
    }
`;

export default OptionItem;
