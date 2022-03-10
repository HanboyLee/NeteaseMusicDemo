import styled from "@emotion/styled/macro";
import { Button, Col, Input, Row, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, getCaptcha } from "../../app/features/login/loginSlice";
import {
    useAuthCode,
    useCtcode,
    useIsVerifyCountBackwards,
    usePwd,
    useSwitcher,
    useUserPhone,
} from "../../hooks/UserHook";
import Footer from "./Footer";
import InputPassword from "./InputPassword";
import InputPhone from "./InputPhone";

const ContentLogin = ({ children }) => {
    const [userPhone, setUserPhone] = useUserPhone();
    const [authCode, setAuthCode] = useAuthCode();
    const [ctcode] = useCtcode();
    const [userPwd] = usePwd();
    const [, setSwitcher] = useSwitcher();
    const { countriesCode, captchaInfo, isVerify } = useSelector((state) => state.login);

    const [mode, setMode] = React.useState(true);
    const checkPwdRef = React.useRef();

    const dispatch = useDispatch();
    //驗證碼倒數時間
    const time = useIsVerifyCountBackwards(120);

    //發送驗證碼
    const onSendCaptcha = React.useCallback(() => {
        dispatch(
            getCaptcha({
                ctcode,
                phone: userPhone,
            })
        );
    }, [ctcode, dispatch, userPhone]);

    const onLogin = () => {
        let LoginMethod = mode ? { captcha: authCode } : { password: userPwd, methodType: 1 };
        const parmas = {
            phone: userPhone,
            countrycode: ctcode,
            ...LoginMethod,
        };
        dispatch(authLogin(parmas));
    };

    return (
        <Row justify="center">
            {children}
            <Content md={24}>
                {/* 輸入手機 */}
                <InputPhone />
                {
                    // 輸入驗證碼
                    mode ? (
                        <WrapAuthCode>
                            <>
                                <Input
                                    placeholder={"请输入验证码"}
                                    type={"text"}
                                    onChange={(e) => setAuthCode(e.target.value)}
                                    value={authCode}
                                    disabled={!isVerify}
                                />
                                <Button loading={isVerify} onClick={onSendCaptcha} style={{ marginLeft: "1rem" }}>
                                    {!!time ? time : "获取验证码"}
                                </Button>
                            </>
                        </WrapAuthCode>
                    ) : (
                        // 密碼登入
                        <PwdWrap>
                            <InputPassword placeholder={"请输入密码"} ref={checkPwdRef} />
                        </PwdWrap>
                    )
                }
                <div className="switchMessae">
                    <div onClick={() => setMode((prev) => !prev)} type="text">
                        {mode ? "密码登入" : "短信登入"}
                    </div>
                </div>
                <Btn onClick={onLogin} style={{ width: "100%", marginTop: "1rem" }}>
                    登入
                </Btn>
            </Content>
            <Footer switchNun={2} title={"没有帐号？免费注册 > "} align={"end"} />
        </Row>
    );
};

const PwdWrap = styled.div`
    padding-top: 0.5rem;
`;

const Content = styled(Col)`
    padding: 4rem 2rem;
    & .switchMessae {
        display: inline-block;
        margin-top: 0.5rem;
        cursor: pointer;
        user-select: none;
    }
`;

const WrapAuthCode = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;
`;
const Btn = styled(Button)`
    width: 100%;
    margin-top: 0.5rem;
`;

export default ContentLogin;
