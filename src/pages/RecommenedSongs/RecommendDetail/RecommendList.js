import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendSongsDeatil } from "../../../app/features/lasterList/recommendSongSlice";

//components
import Loading from "../../../components/Loading";
import MusicTableList from "../../../components/MusicTableList";

const extractIds = ({ ids, current = 0, pageSize = 10 }) => {
    const currentIds = ids
        .slice(current * pageSize, current * pageSize + pageSize)
        .map((item) => item.id)
        .join(",");
    return currentIds;
};

const RecommendList = ({ trackIds }) => {
    const ids = React.useMemo(() => trackIds.map((item) => item.id).join(",") || "", [trackIds]);
    const { songs, songLoading } = useSelector((state) => state.recommendSong);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (ids.length) {
            dispatch(getRecommendSongsDeatil({ ids: extractIds({ ids: trackIds }) }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!ids.length || songLoading) {
        return <Loading />;
    }

    const onPagination = (current, pageSize) => {
        dispatch(getRecommendSongsDeatil({ ids: extractIds({ ids: trackIds, current: current - 1, pageSize }) }));
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <MusicTableList
                datas={songs}
                paginationOption={{
                    onChange: onPagination || "",
                    total: trackIds?.length || 0,
                }}
            />
        </div>
    );
};

export default RecommendList;
