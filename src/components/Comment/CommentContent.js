import styled from "@emotion/styled/macro";
import { Divider, Typography } from "antd";
import React from "react";
import Comment from "./Comment";

const CommentContent = ({ commentSet }) => {
    return (
        <Container>
            {/* 熱門 */}
            <Typography.Title level={5}>熱門評論</Typography.Title>
            {CommentWrap(commentSet.hotComments)}
            {/* 一般評論 */}
            <Typography.Title level={5}>最新评论({commentSet.comments.length})</Typography.Title>
            {CommentWrap(commentSet.comments)}
        </Container>
    );
};

const CommentWrap = (datas) => {
    return (
        <div style={{ padding: "0 1rem" }}>
            <Divider />
            {datas.map((item) => {
                if (!item.beReplied.length) {
                    return <Comment key={item.commentId} {...item} />;
                }
                return (
                    <Comment key={item.commentId} {...item}>
                        {item.beReplied.map((_item) => {
                            return <Comment key={_item.beRepliedCommentId} {..._item} />;
                        })}
                    </Comment>
                );
            })}
        </div>
    );
};

const Container = styled.div`
    width: 100%;
`;

export default CommentContent;
