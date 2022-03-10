import { CloudOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import { Button, Col, Row, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../app/features/login/loginSlice";
import Img from "../../components/Image/Img";
import { themeConstant } from "../../configs/constant";
import { useIsLogin, useShowModal } from "../../hooks/UserHook";

import SearchCom from "./SearchCom";
const TopBarContainer = () => {
    const [, setShow] = useShowModal();
    const { userInfo } = useSelector((state) => state.login);
    const isLogin = useIsLogin();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Row>
            {/* 搜尋 */}
            <Col md={20}>
                <SearchCom />
            </Col>
            {isLogin ? (
                //登出
                <AvatarWrap>
                    <Tooltip placement="top" title={<ProfileListSelector />} arrowPointAtCenter>
                        <Avatar
                            size={48}
                            src={<Img styles={{ width: "100%", height: "100%" }} src={userInfo.avatarUrl} />}
                        />
                    </Tooltip>
                </AvatarWrap>
            ) : (
                //登入
                <LoginWrap onClick={() => setShow(true)}>
                    <UserOutlined className="icon" />
                    <span>登入 / 註冊</span>
                </LoginWrap>
            )}
        </Row>
    );
};

export default TopBarContainer;

const ProfileListSelector = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //登出
    const onLogout = () => {
        //清除資料
        dispatch(userLogout());
        //返回首頁
        navigate("/");
    };

    //我的音樂
    const onMyMusic = () => {
        navigate("/MyMusic");
    };

    return (
        <>
            <Btn onClick={onMyMusic} style={{ color: "#fff" }} type="text">
                <CloudOutlined className="icon" /> <span>我的音乐</span>
            </Btn>
            <Btn onClick={onLogout} style={{ color: "#fff" }} type="text">
                <LogoutOutlined className="icon" /> <span>退出</span>
            </Btn>
        </>
    );
};
const Btn = styled(Button)`
    color: #fff;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.2rem;
    margin: auto;
    & .icon {
        color: #ccc;
        line-height: 2;
    }
    & > span {
        margin-right: auto;
    }
    &:hover {
        background-color: ${({ theme }) => theme[themeConstant.secondaryColor]};
        .icon,
        span {
            color: ${({ theme }) => theme[themeConstant.textColorSecondary]};
        }
    }
`;
const LoginWrap = styled(Col)`
    color: #555;
    font-size: 1.2rem;
    border-radius: ${({ theme }) => theme[themeConstant.borderRadiusBase]};
    transition: color 0.3s ease;
    cursor: pointer;
    & .icon {
        margin-right: 5px;
    }
    &:hover {
        color: ${({ theme }) => theme[themeConstant.textColor]};
    }
`;

const AvatarWrap = styled.div`
    z-index: 100;
`;
