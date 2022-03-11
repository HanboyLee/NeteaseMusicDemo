import styled from "@emotion/styled/macro";
import { Button, Col, message, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkPhoneHasUsing, getCaptcha, setHasVerify } from "../../app/features/login/loginSlice";
import { useCtcode, useSwitcher, useUserPhone } from "../../hooks/UserHook";
import Footer from "./Footer";
import InputPassword from "./InputPassword";
import InputPhone from "./InputPhone";

const ContentSignup = ({ children }) => {
    const [userPhone] = useUserPhone();
    const [ctcode] = useCtcode();
    const [, setSwitcher] = useSwitcher();
    const dispatch = useDispatch();
    const { isVerify } = useSelector((state) => state.login);
    const checkPwdRef = React.useRef();
    const [isPhoneSignup, setIsPhoneSignup] = React.useState(false);

    const onClick = async () => {
        dispatch(setHasVerify(false));
        const { isCheckPwdPass } = checkPwdRef.current;
        //手機是否被註冊

        const checkPhoneSignup = await checkPhoneHasUsing({ phone: userPhone, countrycode: ctcode });

        //檢查手機使否被註冊
        if (checkPhoneSignup) {
            setIsPhoneSignup(checkPhoneSignup);
            return message.error("手机已被注册过", 2);
        }
        //檢查密碼格式
        if (!isCheckPwdPass) {
            //密碼不符合規定內
            return message.error("密码错误格式要求");
        }
        //送出驗證碼
        dispatch(
            getCaptcha({
                ctcode,
                phone: userPhone,
            })
        );
    };

    React.useEffect(() => {
        //進入ContentVerifyCode
        if (!isPhoneSignup && isVerify) setSwitcher(3);
    }, [isVerify, setSwitcher, isPhoneSignup]);
    /**
     1. 手機 密碼
     2.title:手机号注册
     提示： 你的手机号：+886 938***102
     为了安全，我们会给你发送短信验证码
     btn 下一步
     
     3.title:手机号注册
     提示：取一个昵称，让大家记住你
    input:placeholder:昵称不少于4个字母或两个汉字
     重點：沒有返回功能只有下一個步驟
     btn 完成注册开启云音乐
     */

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
