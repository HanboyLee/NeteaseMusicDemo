import styled from "@emotion/styled/macro";
import { Button, Image, Input, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useIsLogin, useNotLoginToPopupLoginModal } from "../../hooks/UserHook";
import unknowUser from "../../asset/images/unknowUser.svg";
import { useDispatch } from "react-redux";
import { postComment } from "../../app/features/comment/commentSlice";
const InputComment = ({ id, t = 1, type }) => {
    const { userInfo } = useSelector((state) => state.login);
    const [commentText, setCommentText] = React.useState("");
    const dispatch = useDispatch();
    const isLogin = useIsLogin();
    const onNotLoginToPopupLoginModal = useNotLoginToPopupLoginModal();
    const imgUrl = !isLogin ? unknowUser : userInfo.avatarUrl;
    let MaxTextlength = React.useMemo(() => {
        let maxLength = 140;
        return maxLength - commentText.length;
    }, [commentText]);

    //送出評論
    const onClick = () => {
        if (commentText.trim() === "") {
            return message.warning("评论不能为空");
        }
        //type:
        // 0: 歌曲
        // 1: mv
        // 2: 歌单
        // 3: 专辑
        // 4: 电台
        // 5: 视频
        // 6: 动态
        dispatch(postComment({ t, type, id, content: commentText }));
        setCommentText("");
    };
    const onChange = (e) => setCommentText(e.target.value);

    return (
        <Contianer>
            <div className="comment">
                <div className="imgWrap">
                    <Image preview={false} className="img" src={imgUrl} />
                </div>
                <InputWrap disabledColor={isLogin ? "#fff" : "#eee"}>
                    <Input.TextArea
                        maxLength={140}
                        allowClear
                        onChange={onChange}
                        disabled={!isLogin}
                        placeholder="评论"
                        value={commentText}
                        className="area"
                        rows={3}
                    />
                </InputWrap>
            </div>
            <BtnWarp>
                <span className="textlen">{MaxTextlength}</span>
                <Button
                    onClick={() => (isLogin ? onClick() : onNotLoginToPopupLoginModal({ msg: "登入后即可评论" }))}
                    className="btn"
                >
                    评论
                </Button>
            </BtnWarp>
        </Contianer>
    );
};
const Contianer = styled.div`
    .comment {
        display: flex;
        /* align-items: center; */
        .imgWrap {
            width: 50px;
            height: 50px;
        }
    }
`;

const InputWrap = styled.div`
    width: 100%;
    padding: 1rem;
    text-align: center;
    position: relative;
    flex: 1;
    & .area {
        width: 100%;
        resize: none;
    }
    &::before {
        content: "";
        position: absolute;
        top: 30px;
        left: 5px;
        width: 0px;
        height: 0px;
        border-top: 12px solid transparent;
        border-right: 12px solid ${({ disabledColor }) => disabledColor};
        border-bottom: 12px solid transparent;
        z-index: 100;
    }
`;
const BtnWarp = styled.div`
    display: block;
    padding: 1rem;
    text-align: end;
    .textlen {
        padding-right: 1rem;
    }
    & .btn {
        background-color: skyblue;
        border: 1px solid raba(0, 0, 0, 0.4);
        span {
            color: #fff !important;
        }
        :hover {
            background-color: blue;
        }
    }
`;

export default React.memo(InputComment);
