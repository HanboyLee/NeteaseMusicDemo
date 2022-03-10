import styled from "@emotion/styled/macro";
import { Button, Col, message, Row } from "antd";
import React from "react";
import { checkPhoneHasUsing } from "../../app/features/login/loginSlice";
import { useCtcode, useUserPhone } from "../../hooks/UserHook";
import Footer from "./Footer";
import InputPassword from "./InputPassword";
import InputPhone from "./InputPhone";

const ContentSignup = ({ children }) => {
    const [userPhone] = useUserPhone();
    const [ctcode] = useCtcode();

    const checkPwdRef = React.useRef();

    const onClick = () => {
        const { isCheckPwdPass } = checkPwdRef.current;
        //手機是否被註冊
        checkPhoneHasUsing({ phone: userPhone, countrycode: ctcode });

        //密碼不符合規定內
        if (!isCheckPwdPass) {
            return message.error("密码错误格式要求");
        }
        //送出註冊資料
    };

    return (
        <Row>
            {children}
            <WarpContent>
                <div className="label">手机号:</div>
                <InputPhone />
                <div className="label pwdTitle">密码:</div>
                <InputPassword ref={checkPwdRef} placeholder={"设置登入密码，不得小于8位"} />
            </WarpContent>
            <Col md={24} style={{ textAlign: "center", padding: "1rem" }}>
                <Button onClick={onClick} style={{ width: "50%" }}>
                    下一步
                </Button>
            </Col>
            <Footer switchNun={1} title={"<  返回登录 "} align={"start"} />
        </Row>
    );
};

const WarpContent = styled(Col)`
    margin: auto;
    padding: 2rem;
    & .pwdTitle {
        padding-top: 1rem;
    }
    & .label {
        padding-bottom: 0.3rem;
    }
`;

export default ContentSignup;
