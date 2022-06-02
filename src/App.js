import React from 'react';
import './App.less';
import 'nprogress/nprogress.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@emotion/react';
import theme from './configs/themes';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

import NavBar from './pages/NavBar';

//hooks
import AudioProvider from './hooks/AudioHook';
import UserHook from './hooks/UserHook';
import Loading from './components/Loading';

//pages
const Home = React.lazy(() => import('./pages/Home'));
const Singer = React.lazy(() => import('./pages/Singer'));
const SingerItem = React.lazy(() => import('./pages/Singer/SingerItem'));
const MvContent = React.lazy(() => import('./pages/MvLatest/MvContent'));
const Album = React.lazy(() => import('./pages/Album'));
const MvLatest = React.lazy(() => import('./pages/MvLatest'));
const HotSinger = React.lazy(() => import('./pages/HotSinger'));
const NewSongs = React.lazy(() => import('./pages/NewSongs'));
const RecommenedSongs = React.lazy(() => import('./pages/RecommenedSongs'));
const RecommendDetail = React.lazy(() => import('./pages/RecommenedSongs/RecommendDetail'));
const Search = React.lazy(() => import('./pages/Search'));
const MyMusic = React.lazy(() => import('./pages/MyMusic'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

//main
function AppWrapper() {
    const emtionTheme = useTheme();

    return (
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <ThemeProvider theme={{ ...theme, ...emtionTheme }}>
                    <UserHook>
                        <AudioProvider>
                            <Router>
                                <App />
                            </Router>
                        </AudioProvider>
                    </UserHook>
                </ThemeProvider>
            </ConfigProvider>
        </Provider>
    );
}

const Suspense = ({ children }) => {
    return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>;
};

const App = () => {
    const routers = useRoutes([
        {
            path: '/',
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
                    path: 'search/:keywords',
                    element: (
                        <Suspense>
                            <Search />
                        </Suspense>
                    ),
                },
                {
                    //所有歌手頁面
                    path: 'singer',
                    element: (
                        <Suspense>
                            <Singer />
                        </Suspense>
                    ),
                },
                {
                    //歌手頁面
                    path: 'singer/:singerId',
                    element: (
                        <Suspense>
                            <SingerItem />
                        </Suspense>
                    ),
                },
                {
                    //ＭＶ
                    path: 'mvPlayer/:mvId',
                    element: (
                        <Suspense>
                            <MvContent />
                        </Suspense>
                    ),
                },
                {
                    //歌手專輯頁面
                    path: 'album/:albumId',
                    element: (
                        <Suspense>
                            <Album />
                        </Suspense>
                    ),
                },
                {
                    //熱門排行
                    path: 'hotSinger',
                    element: (
                        <Suspense>
                            <HotSinger />
                        </Suspense>
                    ),
                },
                {
                    //熱門ＭＶ
                    path: 'hotMv',
                    element: (
                        <Suspense>
                            <MvLatest />
                        </Suspense>
                    ),
                },
                {
                    //最新音樂
                    path: 'newSong',
                    element: (
                        <Suspense>
                            <NewSongs />
                        </Suspense>
                    ),
                },
                {
                    //推薦音樂
                    path: 'recommenedSongs',
                    element: (
                        <Suspense>
                            <RecommenedSongs />
                        </Suspense>
                    ),
                },
                {
                    path: 'recommenedSongs/:recommenedId',
                    element: (
                        <Suspense>
                            <RecommendDetail />
                        </Suspense>
                    ),
                },
                {
                    path: 'myMusic',
                    element: (
                        <Suspense>
                            <MyMusic />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: '*',
            element: (
                <Suspense>
                    <NotFoundPage />
                </Suspense>
            ),
        },
    ]);
    return routers;
};

export default AppWrapper;
