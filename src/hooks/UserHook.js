import { message } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authSignup, getCountrieCode, setHasVerify } from '../app/features/login/loginSlice';
import { getStorge } from '../services/storgeHelper';

const Context = React.createContext();

const UserHook = ({ children }) => {
    const dispatch = useDispatch();
    const [userPhone, setUserPhone] = React.useState('');
    const [show, setShow] = React.useState(null);
    const [authCode, setAuthCode] = React.useState(null);
    const [switcher, setSwitcher] = React.useState(0);
    const [ctcode, setCtcode] = React.useState('86');
    const [userPwd, setUserPwd] = React.useState('');
    const [nickname, setNickname] = React.useState('');
    const { userInfo } = useSelector((state) => state.login);
    //密碼輸入錯誤也會登入

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isLogin = React.useMemo(() => getStorge({ key: 'loginType' }), [userInfo]);

    React.useEffect(() => {
        dispatch(getCountrieCode());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //偵測當前是否有登入狀態
    React.useEffect(() => {
        setShow(false);
    }, [isLogin]);

    return (
        <Context.Provider
            value={{
                switcher,
                setSwitcher,
                show,
                setShow,
                userPhone,
                setUserPhone,
                authCode,
                setAuthCode,
                ctcode,
                setCtcode,
                isLogin,
                userPwd,
                setUserPwd,
                nickname,
                setNickname,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useShowModal = () => [React.useContext(Context).show, React.useContext(Context).setShow];

export const useUserPhone = () => [React.useContext(Context).userPhone, React.useContext(Context).setUserPhone];

export const useAuthCode = () => [React.useContext(Context).authCode, React.useContext(Context).setAuthCode];

export const useSwitcher = () => [React.useContext(Context).switcher, React.useContext(Context).setSwitcher];

export const useCtcode = () => [React.useContext(Context).ctcode, React.useContext(Context).setCtcode];

export const usePwd = () => [React.useContext(Context).userPwd, React.useContext(Context).setUserPwd];

export const useNickname = () => [React.useContext(Context).nickname, React.useContext(Context).setNickname];

export const useIsLogin = () => React.useContext(Context).isLogin;

//驗證碼登入倒數
export const useIsVerifyCountBackwards = (initTime = 5) => {
    const [time, setTime] = React.useState(initTime);
    const { isVerify } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    React.useEffect(() => {
        let timer;
        if (isVerify && time > 0) {
            timer = setTimeout(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        } else {
            dispatch(setHasVerify(false));
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isVerify, time, dispatch]);
    return !!time && isVerify ? time + 's' : '';
};

//初始化資料
export const useInittal = () => {
    const [, setUserPhone] = useUserPhone();
    const [, setCtcode] = useCtcode();
    const [, setAuthCode] = useAuthCode();
    const [, setUserPwd] = usePwd();
    const [, setSwitcher] = useSwitcher();
    const dispatch = useDispatch();
    return () => {
        setUserPhone();
        setCtcode('86');
        setAuthCode(null);
        setUserPwd('');
        setSwitcher(0);
        dispatch(setHasVerify(false));
    };
};

//註冊
export const useOnSignup = () => {
    const dispatch = useDispatch();
    const [phone] = useUserPhone();
    const [countrycode] = useCtcode();
    const [captcha] = useAuthCode();
    const [password] = usePwd();
    const [nickname] = useNickname();
    const [, setShow] = useShowModal();
    const initialHandle = useInittal();
    return () => {
        dispatch(
            authSignup({
                phone,
                countrycode,
                captcha,
                password,
                nickname,
            })
        );

        setShow(false);
        initialHandle();
    };
    //     captcha: 验证码
    // phone : 手机号码
    // password: 密码
    // nickname: 昵称
    // countrycode;国家码
};

//未登入狀態跳出視窗
export const useNotLoginToPopupLoginModal = () => {
    const [, setShow] = useShowModal();
    return ({ msg }) => {
        message.info(msg, 0.7, () => setShow(true));
    };
};

export const withLogin = (Com) => (props) => {
    const navigate = useNavigate();
    const isLogin = useIsLogin();
    React.useEffect(() => {
        if (!isLogin) {
            navigate('/');
        }
    }, [isLogin, navigate]);
    return <Com {...props} />;
};

export default UserHook;
