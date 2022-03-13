import { Pagination } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComment, setPagination } from "../../../app/features/comment/commentSlice";
import CommentContent from "../../../components/Comment/CommentContent";

import { urlPath } from "../../../configs/constant";

const RecommendComment = ({ id }) => {
    const dispatch = useDispatch();
    const { commentList, loading, queryInfo, refreshComment } = useSelector((state) => state.comment);

    React.useEffect(() => {
        dispatch(getComment({ id, offset: queryInfo.offset, timestamp: refreshComment }, urlPath.RECOMMEND_COMMENT));
    }, [dispatch, queryInfo, id, refreshComment]);

    const onPagination = (current) => {
        dispatch(setPagination({ num: current, offset: (current - 1) * 20 }));
    };
    return (
        <div>
            {/* 評論 */}
            {!loading && (
                <CommentContent id={id} t={1} type={2} datas={commentList}>
                    <Pagination
                        style={{ textAlign: "center" }}
                        showLessItems
                        onChange={onPagination}
                        current={queryInfo.num}
                        total={commentList.total}
                        showSizeChanger={false}
                        pageSize={20}
                    />
                </CommentContent>
            )}
        </div>
    );
};

export default RecommendComment;
