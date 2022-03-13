import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setChangeCurrentPage } from "../../app/features/discover/searchSlice";

export const usePagination = () => {
    const dispatch = useDispatch();
    const { queryInfo } = useSelector((state) => state.search);
    const currentPage = React.useMemo(() => (!!queryInfo.offset ? queryInfo.offset / 10 + 1 : 1), [queryInfo.offset]);
    return {
        onPagination(current, pageSize) {
            dispatch(setChangeCurrentPage({ offset: (current - 1) * pageSize, limit: pageSize }));
        },
        currentPage,
    };
};
