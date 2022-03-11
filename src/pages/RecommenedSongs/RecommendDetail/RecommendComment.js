import { Divider, Pagination } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommentComment, onRecommentPagination } from "../../../app/features/comment/commentSlice";
import CommentItem from "../../../components/Comment/Comment";
import Loading from "../../../components/Loading";

const RecommendComment = ({ id }) => {
    const dispatch = useDispatch();
    const { recommentComment, recommentLoading, recommentQueryInfo } = useSelector((state) => state.comment);
    React.useEffect(() => {
        dispatch(getRecommentComment({ id, offset: recommentQueryInfo.offset }));
    }, [dispatch, recommentQueryInfo, id]);

    if (recommentLoading) {
        return <Loading />;
    }

    const onPagination = (current) => {
        dispatch(onRecommentPagination({ num: current, offset: (current - 1) * 20 }));
    };
    return (
        <div>
            {/* 評論 */}
            <CommentWrap datas={recommentComment.comments} />
            <Pagination
                style={{ textAlign: "center" }}
                showLessItems
                onChange={onPagination}
                current={recommentQueryInfo.num}
                total={recommentComment.total}
                showSizeChanger={false}
                pageSize={20}
            />
        </div>
    );
};

const CommentWrap = ({ datas }) => {
    return (
        <div style={{ padding: "0 1rem" }}>
            <Divider />
            {datas.map((item) => {
                if (!item.beReplied.length) {
                    return <CommentItem key={item.commentId} {...item} />;
                }
                return (
                    <CommentItem key={item.commentId} {...item}>
                        {item.beReplied.map((_item) => {
                            return <CommentItem key={_item.beRepliedCommentId} {..._item} />;
                        })}
                    </CommentItem>
                );
            })}
        </div>
    );
};
export default RecommendComment;
