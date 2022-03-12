import { CloseOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import { Col } from "antd";
import React from "react";
import { Modal } from "react-overlays";
import { useInittal, useShowModal, useSwitcher } from "../../hooks/UserHook";

//components
import { themeConstant } from "../../configs/constant";

import ContentDefault from "./ContentDefault";
import ContentLogin from "./ContentLogin";
import ContentSignup from "./ContentSignup";
import ContentVerifyCode from "./ContentVerifyCode";
import ContentNickName from "./ContentNickName";

const LoginModal = () => {
    const [show] = useShowModal();
    const [switcher] = useSwitcher();

    const renderBackdrop = (props) => <Backdrop {...props} />;
    React.useReducer();
    return (
        <>
            <RandomlyPositionedModal renderBackdrop={renderBackdrop} show={show}>
                {/* 預設畫面 */}
                {SwitcherContent(switcher)}
            </RandomlyPositionedModal>
        </>
    );
};

const SwitcherContent = (switcherNum) => {
    switch (switcherNum) {
        case 1:
            return (
                <ContentLogin>
                    <Header title={"手机号登入"} />
                </ContentLogin>
            );

        case 2:
            return (
                <ContentSignup>
                    <Header title={"手机号注册"} />
                </ContentSignup>
            );
        case 3:
            return (
                <ContentVerifyCode>
                    <Header title={"手机号注册"} />
                </ContentVerifyCode>
            );
        case 4:
            return (
                <ContentNickName>
                    <Header title={"手机号注册"} />
                </ContentNickName>
            );

        default:
            return (
                <ContentDefault>
                    <Header title={"登入"} />
                </ContentDefault>
            );
    }
};

const Header = ({ title }) => {
    const [, setShow] = useShowModal();
    const setInittal = useInittal();
    return (
        <Top md={24}>
            <div>{title}</div>
            <CloseOutlined
                className="icon"
                onClick={() => {
                    //關閉視窗後初始化資料
                    setInittal();
                    setShow(false);
                }}
            />
        </Top>
    );
};

const Top = styled(Col)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    color: #fff;
    height: 50px;
    padding: 0 2rem;
    & .icon {
        cursor: pointer;
    }
`;

const Backdrop = styled.div`
    position: fixed;
    z-index: 1040;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.5;
`;

const RandomlyPositionedModal = styled(Modal)`
    border-radius: ${({ theme }) => theme[themeConstant.borderRadiusBase]};
    overflow: hidden;
    position: fixed;
    width: 450px;
    z-index: 1040;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;
export default React.memo(LoginModal);
