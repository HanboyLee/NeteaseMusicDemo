import styled from "@emotion/styled/macro";
import { Input, message, Select } from "antd";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchCom = () => {
    const { loading } = useSelector((state) => state.search);
    const searchRef = useRef();
    const navigate = useNavigate();

    const onSearch = (val, event) => {
        //搜尋資料不能為空
        if (val.trim() === "") {
            return searchRef.current.focus();
        }
        return navigate(`/search/${val}`);
    };

    const onKeyPress = (e) => {
        //Enter鍵=13
        if (e.key === "Enter") {
            if (e.target.value.trim() === "") {
                return message.warning("请输入内容!", 1, () => searchRef.current.focus());
            }
            navigate(`/search/${e.target.value}`);
        }
    };

    return (
        <SearchBar
            loading={loading}
            ref={searchRef}
            size="large"
            placeholder="输入收寻音乐"
            onKeyPress={onKeyPress}
            onSearch={onSearch}
            allowClear
        />
    );
};

const SearchBar = styled(Input.Search)`
    vertical-align: middle;
    max-width: 400px !important;
`;

export default React.memo(SearchCom);
