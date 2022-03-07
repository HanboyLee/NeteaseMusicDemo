import { Table } from "antd";
import React from "react";
import { transforTime } from "../../utils/common";
import Img from "../Image/Img";
import PlaySongIcon from "../PlaySong/PlaySongIcon";

const MusicTableList = ({ datas, paginationOption = {} }) => {
    const transforDatas = React.useMemo(
        () =>
            datas?.map((item, i) => {
                return {
                    key: i + 1,
                    index: i + 1,
                    paly: item,
                    cover: item?.al?.picUrl || item.album.picUrl,
                    songTitle: item.name,
                    singer: item?.ar?.[0]?.name || item?.artists?.[0]?.name,
                    duration: transforTime(item?.dt || item?.duration, "ms"),
                };
            }) || [],
        [datas]
    );
    return (
        <Table
            style={{ width: "100%" }}
            bordered
            position={"buttomCenter"}
            pagination={paginationOption}
            dataSource={transforDatas}
            columns={[
                {
                    title: "索引",
                    dataIndex: "index",
                    key: "index",
                    align: "center",
                },
                {
                    title: "封面",
                    dataIndex: "cover",
                    key: "cover",
                    align: "center",
                    render: (url) => {
                        return (
                            <div style={{ width: 75, margin: "0 auto" }}>
                                <Img src={url} />
                            </div>
                        );
                    },
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
                    width: "150px",
                },
            ]}
        />
    );
};

export default MusicTableList;
