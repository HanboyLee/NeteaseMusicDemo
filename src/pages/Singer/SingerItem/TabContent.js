import React from "react";
import { Tabs } from "antd";
import TabBox from "./TabBox";
import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";
import { themeConstant } from "../../../configs/constant";

//tabContent
import SimiTabContent from "./SimiTabContent";
import MvTabContent from "./MvTabContent";
import AlbumsContent from "./AlbumsContent";
import IntroContent from "./IntroContent";
import TopSongContent from "./TopSongContent";
const TabContent = (props) => {
    const data = [
        // { id: 1, tab: "所有专辑", ComTabContent: IntroContent, datas: props.desc },
        // { id: 2, tab: "相关MV", ComTabContent: SimiTabContent, datas: props.simi },
        // { id: 3, tab: "艺人介绍", ComTabContent: SimiTabContent, datas: props.simi },
        // { id: 4, tab: "相似歌手", ComTabContent: SimiTabContent, datas: props.simi },
        { id: 1, tab: "歌手热门50首歌曲", ComTabContent: TopSongContent, datas: props.topSong50 },
        { id: 2, tab: "所有专辑", ComTabContent: AlbumsContent, datas: props.albums },
        { id: 3, tab: "相关MV", ComTabContent: MvTabContent, datas: props.mvs },
        { id: 4, tab: "艺人介绍", ComTabContent: IntroContent, datas: props.desc },
        { id: 5, tab: "相似歌手", ComTabContent: SimiTabContent, datas: props.simi },
    ];
    const [currentTab, setCurrentTab] = React.useState("1");
    const onTabClick = (key) => setCurrentTab(key);

    return (
        <Tabs
            defaultActiveKey={"1"}
            animated={false}
            type={"card"}
            tabBarStyle={{ minWidth: "640px" }}
            onTabClick={onTabClick}
        >
            {/* 歌手選項卡 */}
            {data.map((item, i) => {
                const { ComTabContent } = item;
                const keyTab = (i + 1).toString();
                const isMatch = currentTab === keyTab;
                const activeColor = isMatch
                    ? "color:#f00;box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);padding:.5rem;"
                    : "";
                return (
                    <TabBox
                        tab={<TabTitle activeColor={activeColor}>{item.tab}</TabTitle>}
                        tabkey={keyTab}
                        key={keyTab}
                        isActive={isMatch}
                    >
                        <ComTabContent datas={item.datas} {...props.artist} />
                    </TabBox>
                );
            })}
        </Tabs>
    );
};

const TabTitle = styled.span`
    display: inline-block;
    width: 100%;
    ${(props) => props.activeColor};
    border-radius: ${({ theme }) => theme[themeConstant.borderRadiusBase]};
`;
export default TabContent;
