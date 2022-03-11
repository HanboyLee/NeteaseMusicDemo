import styled from "@emotion/styled/macro";
import { Button, Col, Input, Row } from "antd";
import React, { useCallback } from "react";
import { useNickname, useOnSignup } from "../../hooks/UserHook";

const ContentNickName = ({ children }) => {
    const [nickname, setNickname] = useNickname();
    const onChange = (e) => setNickname(e.target.value);
    const onSignup = useOnSignup();
    const isCheckName = useCallback((str) => {
        if (!str) return true;
        let ta = str.split(""),
            str_l = 0;
        let str_fa = Number(ta[0].charCodeAt());
        //第一個判斷大寫Ａ-Z，第二a-z，第三中文字母
        if ((str_fa >= 65 && str_fa <= 90) || (str_fa >= 97 && str_fa <= 122) || str_fa > 255) {
            for (let i = 0; i <= ta.length - 1; i++) {
                str_l++;
                if (Number(ta[i].charCodeAt()) > 255) {
                    str_l++;
                }
            }
            if (str_l >= 4 && str_l <= 16) {
                return false;
            }
        }
        return true;
    }, []);

    return (
        <Container>
            {children}
            <Col xs={24} className="prompt">
                取一个昵称，让大家记住你
            </Col>
            <Col xs={24} className="inputWrap">
                <Input
                    className="input"
                    placeholder="昵称不少于4个字母或两个汉字"
                    value={nickname}
                    onChange={onChange}
                />
            </Col>
            <Col xs={24} className="btnWrap">
                <Button disabled={isCheckName(nickname)} className="btn" type="primary" onClick={onSignup}>
                    完成注册开启云音乐
                </Button>
            </Col>
        </Container>
    );
};

const Container = styled(Row)`
    .prompt {
        text-align: center;
        padding: 1rem 0;
    }
    .input {
        display: block;
        width: 80%;
        margin: 0 auto;
    }
    .btnWrap {
        padding: 1rem 0;
        text-align: center;
        .btn {
            background-color: skyblue;
        }
        .btn:hover {
            background-color: blue;
        }
    }
`;

export default ContentNickName;
