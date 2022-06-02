import styled from '@emotion/styled/macro';
import { Input, message } from 'antd';
import React, { useRef } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchCom = () => {
    const { loading } = useSelector((state) => state.search);
    const searchRef = useRef();
    const navigate = useNavigate();

    const onSearch = (val, event) => {
        //搜尋資料不能為空
        if (val.trim() === '') {
            return searchRef.current.focus();
        }
        navigate(`/search/${val}`);
        searchRef.current.state.value = '';
    };

    const onKeyPress = React.useCallback(
        (e) => {
            //Enter鍵=13
            if (e.target.value.trim() === '') {
                message.warning('请输入内容!', 1, () => searchRef.current.focus());
            } else {
                navigate(`/search/${e.target.value}`);
                searchRef.current.state.value = '';
            }
        },
        [navigate]
    );

    return (
        <SearchBar
            loading={loading}
            ref={searchRef}
            size="large"
            placeholder="输入收寻音乐"
            onSearch={onSearch}
            onPressEnter={onKeyPress}
            allowClear
        />
    );
};

const SearchBar = styled(Input.Search)`
    vertical-align: middle;
    max-width: 400px !important;
`;

export default React.memo(SearchCom);
