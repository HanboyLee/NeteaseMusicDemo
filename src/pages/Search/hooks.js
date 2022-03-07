import { useDispatch } from "react-redux";
import { setChangeCurrentPage } from "../../app/features/discover/searchSlice";

export const usePagination = () => {
    const dispatch = useDispatch();
    return (current, pageSize) => {
        dispatch(setChangeCurrentPage({ offset: current * pageSize, limit: pageSize }));
    };
};
