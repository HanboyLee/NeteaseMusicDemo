import { v4 as uuidv4 } from "uuid";
import { SmileFilled, CustomerServiceFilled } from "@ant-design/icons";

import { ReactComponent as MVIcon } from "../asset/Icons/MVIcon.svg";
import { ReactComponent as RankingIcon } from "../asset/Icons/rankingIcon.svg";

const styles = { width: 20, height: 20, verticalAlign: "middle" };

export const links = [
    { id: uuidv4(), to: "/", title: "众音乐", Icon: <SmileFilled /> },
    {
        id: uuidv4(),
        to: "/recommenedSongs",
        title: "推荐音乐",
        Icon: <CustomerServiceFilled />,
    },
    {
        id: uuidv4(),
        to: "/hotMv",
        title: "最新ＭＶ",
        Icon: <MVIcon style={styles} />,
    },
    {
        id: uuidv4(),
        to: "/newSong",
        title: "最新音乐",
        Icon: <CustomerServiceFilled />,
    },
    {
        id: uuidv4(),
        to: "/hotSinger",
        title: "热门排行",
        Icon: <RankingIcon style={styles} />,
    },
    {
        id: uuidv4(),
        to: "/singer",
        title: "歌手",
        Icon: <CustomerServiceFilled />,
    },
];
