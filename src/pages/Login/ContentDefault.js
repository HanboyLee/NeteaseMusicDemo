import { CloseOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import { Button, Col, Row } from "antd";
import React from "react";
import Img from "../../components/Image/Img";
//images
import platform from "../../asset/images/platform.png";
import { useSwitcher } from "../../hooks/UserHook";
const ContentDefault = ({ children }) => {
    const [, setSwitcher] = useSwitcher();

    return (
        <Row>
            {children}
            <Center>
                <div className="selectorContent">
                    <div className="child">
                        <Img src={platform} />
                    </div>
                    <Button onClick={() => setSwitcher(1)} className="child btn">
                        手機號登入
                    </Button>
                    <Button onClick={() => setSwitcher(2)} className="child btn">
                        註冊
                    </Button>
                </div>
            </Center>
        </Row>
    );
};
export default React.memo(ContentDefault);

const Center = styled(Col)`
    display: flex;
    justify-content: space-around;
    padding: 2rem;
    width: 100%;
    & .selectorContent {
        display: flex;
        flex: 1;
        flex-direction: column;
        .child {
            flex: 1;
            margin: 1rem 0;
            text-align: center;
        }
        .btn {
            line-height: 30px;
        }
        .btn:nth-of-type(1) {
            background-color: skyblue;
            color: #fff;
        }
        .btn + .btn {
            background-color: #eee;
        }
    }
`;
