import { Input, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useCtcode, useUserPhone } from "../../hooks/UserHook";

const InputPhone = () => {
    const [ctcode, setCtcode] = useCtcode();
    const [userPhone, setUserPhone] = useUserPhone();
    const { countriesCode } = useSelector((state) => state.login);
    //國際號碼選項
    const selectBefore = (
        <Select
            onChange={(info) => setCtcode(info.value)}
            style={{ width: 100 }}
            defaultValue={"+" + ctcode}
            className="select-before"
            labelInValue
        >
            {countriesCode.map((item) => {
                return (
                    <Select.OptGroup key={item.code} label={item.zh}>
                        <Select.Option value={item.code}>{"+" + item.code}</Select.Option>
                    </Select.OptGroup>
                );
            })}
        </Select>
    );
    return (
        <Input
            addonBefore={selectBefore}
            placeholder={"请输入手机号"}
            type={"text"}
            onChange={(e) => {
                setUserPhone(e.target.value.trim().replace(/^(0+)|[^\d]+/g, ""));
            }}
            value={userPhone}
        />
    );
};

export default React.memo(InputPhone);
