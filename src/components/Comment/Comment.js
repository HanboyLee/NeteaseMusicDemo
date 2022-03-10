import React from "react";
import { Comment, Avatar } from "antd";
import { ReactComponent as GoodIcon } from "../../asset/Icons/good.svg";
import styled from "@emotion/styled/macro";
const CommentItem = ({ children, user, content, timeStr, likedCount }) => {
    return (
        <Comment
            author={<div>{user?.nickname}</div>}
            avatar={<Avatar src={user?.avatarUrl} alt="user.nickname" />}
            content={
                <>
                    <p>{content}</p>
                    {
                        <IconWrap>
                            <GoodIcon className="icon" />
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
    & .icon {
        width: 24px;
        height: 24px;
        line-height: 24px;
    }
`;

export default CommentItem;
