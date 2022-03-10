import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { Col } from "antd";
import React from "react";
import { useInittal, useSwitcher } from "../../hooks/UserHook";

const Footer = ({ switchNun, align = "end", title }) => {
    const [, setSwitcher] = useSwitcher();
    const initHandle = useInittal();

    return (
        <FooterWrap align={align} md={24}>
            <Link
                onClick={() => {
                    initHandle();
                    setSwitcher(switchNun);
                }}
            >
                {title}
            </Link>
        </FooterWrap>
    );
};

const alignDynamic = (props) => {
    return css`
        text-align: ${props?.align || "end"};
    `;
};

const FooterWrap = styled(Col)`
    border-top: 1px solid #000;
    padding: 0.5rem 1rem;
    background-color: #eee;
    ${alignDynamic}
`;
const Link = styled.div`
    color: #999;
    cursor: pointer;
`;

export default Footer;
