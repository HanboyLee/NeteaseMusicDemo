import React from "react";
import "./App.less";
import "nprogress/nprogress.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useRoutes, Route, Routes } from "react-router-dom";
import { ThemeProvider, useTheme } from "@emotion/react";
import theme from "./configs/themes";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";

import NavBar from "./pages/NavBar";

//hooks
import AudioProvider from "./hooks/AudioHook";

//pages
const Home = React.lazy(() => import("./pages/Home"));
const Singer = React.lazy(() => import("./pages/Singer"));
const SingerItem = React.lazy(() => import("./pages/Singer/SingerItem"));
const ViedoContent = React.lazy(() => import("./components/Video/ViedoContent"));
const Album = React.lazy(() => import("./pages/Album"));
const MvLatest = React.lazy(() => import("./pages/MvLatest"));
const HotSinger = React.lazy(() => import("./pages/HotSinger"));
const NewSongs = React.lazy(() => import("./pages/NewSongs"));
const RecommenedSongs = React.lazy(() => import("./pages/RecommenedSongs"));
const RecommendDetail = React.lazy(() => import("./pages/RecommenedSongs/RecommendDetail"));
const Search = React.lazy(() => import("./pages/Search"));
//main
function AppWrapper() {
    const emtionTheme = useTheme();

    return (
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <ThemeProvider theme={{ ...theme, ...emtionTheme }}>
                    <AudioProvider>
                        <Router>
                            <App />
                        </Router>
                    </AudioProvider>
                </ThemeProvider>
            </ConfigProvider>
        </Provider>
    );
}

const Suspense = ({ children }) => {
    return <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>;
};

const App = () => {
    const routers = useRoutes([
        {
            path: "/",
            element: (
                <Suspense>
                    <NavBar />
                </Suspense>
            ),
            children: [
                {
                    index: true,
                    element: (
                        <Suspense>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    //搜尋頁面
                    path: "search/:keywords",
                    element: (
                        <Suspense>
                            <Search />
                        </Suspense>
                    ),
                },
                {
                    //所有歌手頁面
                    path: "singer",
                    element: (
                        <Suspense>
                            <Singer />
                        </Suspense>
                    ),
                },
                {
                    //歌手頁面
                    path: "singer/:singerId",
                    element: (
                        <Suspense>
                            <SingerItem />
                        </Suspense>
                    ),
                },
                {
                    //歌手ＭＶ
                    path: "singerPlayer/:singerId",
                    element: (
                        <Suspense>
                            <ViedoContent />
                        </Suspense>
                    ),
                },
                {
                    //歌手專輯頁面
                    path: "album/:albumId",
                    element: (
                        <Suspense>
                            <Album />
                        </Suspense>
                    ),
                },
                {
                    //熱門排行
                    path: "hotSinger",
                    element: (
                        <Suspense>
                            <HotSinger />
                        </Suspense>
                    ),
                },
                {
                    //熱門ＭＶ
                    path: "hotMv",
                    element: (
                        <Suspense>
                            <MvLatest />
                        </Suspense>
                    ),
                },
                {
                    //最新音樂
                    path: "newSong",
                    element: (
                        <Suspense>
                            <NewSongs />
                        </Suspense>
                    ),
                },
                {
                    //推薦音樂
                    path: "recommenedSongs",
                    element: (
                        <Suspense>
                            <RecommenedSongs />
                        </Suspense>
                    ),
                },
                {
                    path: "recommenedSongs/:recommenedId",
                    element: (
                        <Suspense>
                            <RecommendDetail />
                        </Suspense>
                    ),
                },
            ],
        },
    ]);
    return routers;
};

export default AppWrapper;
