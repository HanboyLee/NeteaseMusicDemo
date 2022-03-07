import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setChangeCurrentPage } from "../../app/features/discover/searchSlice";
import MusicTableList from "../../components/MusicTableList";

const SongsPane = () => {
    const { songData, loading, queryInfo } = useSelector((state) => state.search);
    const dispatch = useDispatch();

    const onPagination = (current, pageSize) => {
        dispatch(setChangeCurrentPage({ offset: current * pageSize, limit: pageSize }));
    };

    const currentPage = React.useMemo(() => (queryInfo.offset ? queryInfo.offset / 10 : 1), [queryInfo.offset]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <MusicTableList
            paginationOption={{
                onChange: onPagination || "",
                total: songData.total || 0,
                current: currentPage,
            }}
            datas={songData.list}
        />
    );
};

export default SongsPane;
