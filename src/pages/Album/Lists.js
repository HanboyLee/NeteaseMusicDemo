import React from "react";
import { Table } from "antd";

//utils

import { transforTime } from "../../utils/common";
//components
import PlaySongIcon from "../../components/PlaySong/PlaySongIcon";
import { setStorge } from "../../services/storgeHelper";
import { storageKey } from "../../configs/constant";

const Lists = ({ datas }) => {
    const transforDatas = datas.map((item, i) => {
        return {
            key: i + 1,
            index: i + 1,
            paly: item,
            songTitle: item.name,
            duration: transforTime(item.dt, "ms"),
            singer: item.ar[0].name,
        };
    });

    return (
        <Table
            bordered
            style={{ minWidth: "1000px" }}
            pagination={false}
            dataSource={transforDatas}
            columns={[
                {
                    title: "索引",
                    dataIndex: "index",
                    key: "index",
                    align: "center",
                },
                {
                    title: "",
                    dataIndex: "paly",
                    key: "paly",
                    align: "center",
                    render: (item) => {
                        return <PlaySongIcon {...item} />;
                    },
                },
                {
                    title: "歌曲标题",
                    dataIndex: "songTitle",
                    key: "songTitle",
                    align: "center",
                },
                {
                    title: "时长",
                    dataIndex: "duration",
                    key: "duration",
                    align: "center",
                },
                {
                    title: "歌手",
                    dataIndex: "singer",
                    key: "singer",
                    align: "center",
                },
            ]}
        />
    );
};
export default Lists;
