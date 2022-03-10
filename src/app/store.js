import { configureStore } from "@reduxjs/toolkit";

import singerSlice from "./features/singer/singerSlice";
import singerDetailSlice from "./features/singer/singerDetailSlice";
import albumSlice from "./features/singer/albumSlice";
import songSlice from "./features/singer/songSlice";
import toplistSlice from "./features/toplist/topListSlice";
import mvLatestListSlice from "./features/lasterList/mvLatestListSlice";
import newSongsSlice from "./features/lasterList/newSongsSlice";
import recommendSongSlice from "./features/lasterList/recommendSongSlice";
import commentSlice from "./features/comment/commentSlice";
import personalizedSlice from "./features/discover/personalizedSlice";
import searchSlice from "./features/discover/searchSlice";
import loginSlice from "./features/login/loginSlice";

export const store = configureStore({
    reducer: {
        singer: singerSlice,
        singerDetail: singerDetailSlice,
        album: albumSlice,
        song: songSlice,
        topList: toplistSlice,
        mvLatestList: mvLatestListSlice,
        newSongs: newSongsSlice,
        recommendSong: recommendSongSlice,
        comment: commentSlice,
        personalized: personalizedSlice,
        search: searchSlice,
        login: loginSlice,
    },
});
