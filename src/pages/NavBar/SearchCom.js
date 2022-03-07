import styled from "@emotion/styled/macro";
import { Input, message, Select } from "antd";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchCom = () => {
    const {
        queryInfo: { keywords },
    } = useSelector((state) => state.search);
    const searchRef = useRef();
    const [query, setQuery] = React.useState(keywords || "");

    const navigate = useNavigate();
    const onSearch = (val, event) => {
        //搜尋資料不能為空
        if (val.trim() === "") {
            // message.warning("请输入内容!", 1, () => );
            return searchRef.current.focus();
        }
        navigate(`/search/${val}`);
    };

    return (
        <SearchBar ref={searchRef} size="large" placeholder="输入收寻音乐" onSearch={onSearch} allowClear showCount />
    );
};

const SearchBar = styled(Input.Search)`
    vertical-align: middle;
    max-width: 400px !important;
`;

export default React.memo(SearchCom);
