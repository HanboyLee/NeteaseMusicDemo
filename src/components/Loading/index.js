import { LoadingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import React from "react";
import Img from "../Image/Img";

const Loading = ({ styles = {} }) => {
    const ref = React.useRef(null);
    return (
        <div ref={ref} style={{ width: "100%", overflow: "hidden", textAlign: "center", ...styles }}>
            <LoadingOutlined style={{ fontSize: ref.current.offsetTop / 2 }} />
        </div>
    );
};

export default Loading;
