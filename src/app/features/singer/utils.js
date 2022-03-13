export const transSongs = (datas) => {
    if (datas === null || !datas) {
        return [];
    }
    if (Array.isArray(datas)) {
        const newSongs = datas.map((item) => {
            return extractSong(item);
        });
        return newSongs;
    }
    return extractSong(datas);
};

const extractSong = (item) => ({
    id: item?.songInfo?.id,
    name: item?.songInfo.name,
    musicSrc: item?.songUrl?.url,
    cover: item?.songInfo?.al?.picUrl ?? item?.songInfo?.album?.picUrl,
    singer: item?.songInfo?.ar?.[0]?.name ?? item?.songInfo?.artists?.[0].name,
    duration: parseInt(item?.songInfo?.dt / 1000, 10),
    lyric: item?.songLrc?.lyric || "没有歌词",
});
