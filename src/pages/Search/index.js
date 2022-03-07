import styled from "@emotion/styled/macro";
import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSearch, setType } from "../../app/features/discover/searchSlice";
import MvPane from "./MvPane";
import SongListPane from "./SongListPane";
import SongsPane from "./SongsPane";

const Search = () => {
    const [currentPane, setCurrentPane] = React.useState(1);
    const { keywords } = useParams();
    const { queryInfo, songData, songListData, mvData, navBar, total } = useSelector((state) => state.search);
    const dispatch = useDispatch();
    const renderComs = [
        {
            id: 1,
            Comp: SongsPane,
        },
        {
            id: 1000,
            Comp: SongListPane,
        },
        {
            id: 1004,
            Comp: MvPane,
        },
    ];
    React.useEffect(() => {
        dispatch(getSearch({ ...queryInfo, keywords }));
    }, [queryInfo, dispatch, keywords]);
    return (
        <Conatiner>
            {/* <span>{`搜索“${keywords}”，找到 ${total} 首单曲`}</span> */}
            <Tabs
                centered
                animated={{ inkBar: true, tabPane: true }}
                defaultActiveKey={currentPane}
                type="card"
                size="large"
                onChange={(id) => dispatch(setType(Number(id)))}
            >
                {navBar.map((item, i) => {
                    const { Comp } = renderComs.find((c) => c.id === item.id);

                    return (
                        <Tabs.TabPane
                            tab={<div style={{ width: 75, minWidth: 50, textAlign: "center" }}>{item.name}</div>}
                            key={item.id}
                        >
                            <Comp />
                        </Tabs.TabPane>
                    );
                })}
            </Tabs>
        </Conatiner>
    );
};

const Conatiner = styled.div`
    padding: 1rem;
    .ant-tabs-tab {
        border-bottom: 1px solid #ed5e5e !important;
    }
    .ant-tabs-tab.ant-tabs-tab-active {
        border-bottom: 1px solid #fff !important;
        background-color: red !important;
    }
`;

export default Search;
