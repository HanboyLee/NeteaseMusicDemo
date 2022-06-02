import React from 'react';
import { useSelector } from 'react-redux';

import MusicTableList from '../../components/MusicTableList';
import { usePagination } from './hooks';

const SongsPane = () => {
    const { songData, loading } = useSelector((state) => state.search);

    const { onPagination, currentPage } = usePagination();

    return (
        <MusicTableList
            loading={loading}
            paginationOption={{
                onChange: onPagination || '',
                total: songData.total || 0,
                current: currentPage,
            }}
            datas={songData.list}
        />
    );
};

export default SongsPane;
