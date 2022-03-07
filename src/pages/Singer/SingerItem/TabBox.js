import React from "react";
import { Tabs } from "antd";
const TabBox = ({ isActive, tab, tabkey, children }) => {
    return (
        <Tabs.TabPane style={{ width: "100%", height: "100%" }} active={isActive} tab={tab} key={tabkey}>
            {children}
        </Tabs.TabPane>
    );
};

export default TabBox;
