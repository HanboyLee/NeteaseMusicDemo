import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import { Input } from "antd";
import React from "react";
import { usePwd } from "../../hooks/UserHook";

const InputPassword = React.forwardRef(({ placeholder }, ref) => {
    const [isSpace, setIsSpace] = React.useState(true);
    const [ismultiRole, setIsmultiRole] = React.useState(true);
    const [isFocus, setIsFocus] = React.useState(false);
    const [, setUserPwd] = usePwd();

    const onChange = (e) => {
        let val = e.target.value;
        const isRoleSpace = !/^[^\s]*$/.test(val);
        const isRoleMultiRole = !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(val);
        //不能輸入空白
        if (isRoleSpace) {
            setIsSpace(true);
        } else {
            setIsSpace(false);
        }
        // 6-20个字符，且字母、数字标点符号至少包含2种
        if (isRoleMultiRole) {
            setIsmultiRole(true);
        } else {
            setIsmultiRole(false);
        }
        setUserPwd(val);
    };

    React.useImperativeHandle(
        ref,
        () => ({
            isCheckPwdPass: !isSpace && !ismultiRole,
        }),
        [isSpace, ismultiRole]
    );

    return (
        <>
            <Input
                placeholder={placeholder}
                max={20}
                type={"password"}
                onChange={onChange}
                onFocus={() => setIsFocus(true)}
            />
            <Prompt>
                {isFocus && (
                    <CheckIcon isCheck={isSpace}>
                        <span>不能輸入空白</span>
                    </CheckIcon>
                )}
                {isFocus && (
                    <CheckIcon isCheck={ismultiRole}>
                        <span>8-20个字符，且字母、数字标点符号至少包含2种</span>
                    </CheckIcon>
                )}
            </Prompt>
        </>
    );
});

const CheckIcon = ({ isCheck, children }) => {
    return (
        <CheckWarp>
            {isCheck ? (
                <>
                    <ExclamationCircleOutlined className="icon" style={{ color: "red" }} />
                    {children}
                </>
            ) : (
                <>
                    <CheckCircleOutlined className="icon" style={{ color: "green" }} />
                    {children}
                </>
            )}
        </CheckWarp>
    );
};

const Prompt = styled.div`
    padding-top: 1rem;
`;
const CheckWarp = styled.span`
    display: inline-block;
    margin-right: 0.5rem;
    padding: 0.3rem 0;
    & .icon {
        padding-right: 0.5rem;
    }
`;
export default InputPassword;
