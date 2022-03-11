import { Button, Col, Row } from "antd";
import React from "react";
import { useAuthCode, useCtcode, useSwitcher, useUserPhone } from "../../hooks/UserHook";
import ReactInputVerificationCode from "react-input-verification-code";
import styled from "@emotion/styled";
import { authVerify } from "../../app/features/login/loginSlice";
const ContentVerifyCode = ({ children }) => {
    const [userPhone] = useUserPhone();
    const [ctcode] = useCtcode();
    const [authCode, setAuthCode] = useAuthCode();
    const [, setSwitcher] = useSwitcher();

    //電話隱私遮蔽
    const telphoneTransfor = (phone) => {
        if (!phone) {
            return phone;
        }
        let arr = phone.toString().split("");
        arr.splice(3, 4, "****");
        return arr.join("");
    };

    const onSecurityCode = async () => {
        console.log(userPhone, authCode, "authCode");
        // const isSuccess = true;
        const isSuccess = await authVerify({
            ctcode,
            phone: userPhone,
            captcha: Number(authCode),
        });
        console.log(isSuccess, "onSecurityCode");
        //進入ContentNickName
        if (isSuccess) {
            setSwitcher(4);
        }
    };

    return (
        <Row align="center">
            {children}
            <Pormpt xs={24}>
                <div>
                    你的手机号：{"+" + ctcode} {telphoneTransfor(userPhone)}
                </div>
                <div>为了安全，我们会给你发送短信验证码</div>
            </Pormpt>
            <CodeWrap>
                <ReactInputVerificationCode onChange={setAuthCode} />
            </CodeWrap>
            <BtnWrap xs={24}>
                <Button onClick={onSecurityCode}>下一步</Button>
            </BtnWrap>
        </Row>
    );
};
const Pormpt = styled(Col)`
    padding: 1rem;
    text-align: center;
`;

const BtnWrap = styled(Col)`
    text-align: center;
    padding: 1rem 0;
`;

const CodeWrap = styled(Col)`
    --ReactInputVerificationCode-itemWidth: 2.5rem;
    --ReactInputVerificationCode-itemHeight: 3.5rem;
    padding: 2rem;

    & .ReactInputVerificationCode__item {
        position: relative;
        color: #262626;
        font-weight: 500;
    }

    & .ReactInputVerificationCode__item,
    & .ReactInputVerificationCode__item.is-active {
        box-shadow: none;
    }

    & .ReactInputVerificationCode__item:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 2px;
        background-color: #ebebeb;
        transition: background-color 0.2s ease-out;
    }

    & .ReactInputVerificationCode__item.is-active:after {
        background-color: #046cde;
    }
`;

export default ContentVerifyCode;
