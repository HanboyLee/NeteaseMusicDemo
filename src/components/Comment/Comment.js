import React from "react";
import { Comment, Avatar } from "antd";
import { ReactComponent as GoodIcon } from "../../asset/Icons/good.svg";
import styled from "@emotion/styled/macro";
const CommentItem = ({ children, user, content, timeStr, likedCount }) => {
    return (
        <Comment
            author={<a>{user?.nickname}</a>}
            avatar={<Avatar src={user?.avatarUrl} alt="user.nickname" />}
            content={
                <>
                    <p>{content}</p>
                    {
                        <IconWrap style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                            <GoodIcon style={{ width: "24px", height: "24px", lineHeight: "24px" }} />
                            <div>{likedCount}</div>
                        </IconWrap>
                    }
                </>
            }
            datetime={<p>{timeStr}</p>}
        >
            {children}
        </Comment>
    );
};

const IconWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 2rem;
`;

export default CommentItem;
