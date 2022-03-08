import styled from "@emotion/styled/macro";
import { Menu } from "antd";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { themeConstant } from "../../configs/constant";
import { links } from "../../configs/routers";
import clsx from "clsx";
const SiderContiner = () => {
    const { pathname } = useLocation();
    return (
        <Container>
            {/* 導覽到github */}
            <Top>
                <Link to={"/"}>
                    <i className="iconfont icon-wangyiyunyinle"></i>
                </Link>
            </Top>

            <Body>
                <Menus>
                    {links.map((link, i) => {
                        const matchPath =
                            (link.to !== "/" && pathname.indexOf(link.to) !== -1 && pathname) || link.to === pathname;
                        return (
                            <MenuItem
                                className={clsx(matchPath && "active", "MenuItem")}
                                key={link.id}
                                icon={link.Icon}
                            >
                                <Link to={link.to}>{link.title}</Link>
                            </MenuItem>
                        );
                    })}
                </Menus>
            </Body>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
`;
const Link = styled(NavLink)`
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme[themeConstant.headingColor]} !important;
`;

const Top = styled.div`
    width: 100%;
    text-align: center;
    height: 80px;
    line-height: 80px;
    & .icon-wangyiyunyinle {
        color: #f00;
        font-size: 30px;
    }
`;
const Body = styled.div`
    flex: 1;
    padding: 1rem 2rem;
`;
const Menus = styled(Menu)`
    background-color: transparent;
    border-right: unset;
`;
const MenuItem = styled(Menu.Item)`
    margin: 1.5rem 0 !important;
    background-color: ${({ theme }) => theme[themeConstant.secondaryColor]} !important;
    color: ${({ theme }) => theme[themeConstant.textColorLight]} !important;
    border-radius: ${({ theme }) => theme[themeConstant.borderRadiusBase]};
    &:hover {
        background-color: ${({ theme }) => theme[themeConstant.disabledColor]} !important;
        ${Link} {
            /* color: ${({ theme }) => theme[themeConstant.headingColor]} !important; */
            color: ${({ theme }) => theme[themeConstant.headingColor]} !important;
        }
    }
    &.active {
        border-right: 5px solid ${({ theme }) => theme[themeConstant.headingColor]};
    }
`;

export default SiderContiner;
