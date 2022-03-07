import styled from "@emotion/styled";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Outlet } from "react-router-dom";
import { themeConstant } from "../../configs/constant";
import PlayerBar from "../PlayerBar";
import SearchCom from "./SearchCom";
import SiderContiner from "./SiderContiner";

const NavBar = () => {
    return (
        <Container>
            {/* 側邊欄 */}
            <Side>
                <SiderContiner />
            </Side>
            <LayoutContent>
                {/* 頭部 */}
                <Top>
                    <SearchCom />
                </Top>
                {/* 中間 */}
                <Center>
                    <Outlet />
                </Center>
                {/* 底部 */}
                <Bottom />
            </LayoutContent>
            <PlayerBar />
        </Container>
    );
};

const Container = styled(Layout)`
    width: 100%;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
    position: relative;
    padding-bottom: 3rem;
`;

const LayoutContent = styled(Layout)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid ${({ theme }) => theme[themeConstant.primaryColor]};
`;
const Side = styled(Sider)`
    width: 150px !important;
    background-color: ${({ theme }) => theme[themeConstant.primaryColor]} !important;
`;
const Top = styled(Header)`
    background-color: ${({ theme }) => theme[themeConstant.primaryColor]} !important;
    width: 100%;
    height: 80px;
`;
const Center = styled(Content)`
    padding: 1rem;
    width: 100%;
    flex: 1;
`;
const Bottom = styled(Footer)`
    height: 8rem;
    width: 100%;
`;
export default NavBar;
