import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCountrieCode, setHasVerify } from "../app/features/login/loginSlice";
import { getStorge } from "../services/storgeHelper";
const Context = React.createContext();

const UserHook = ({ children }) => {
    const dispatch = useDispatch();
    const [userPhone, setUserPhone] = React.useState("");
    const [show, setShow] = React.useState(null);
    const [authCode, setAuthCode] = React.useState(null);
    const [switcher, setSwitcher] = React.useState(0);
    const [ctcode, setCtcode] = React.useState("86");
    const [userPwd, setUserPwd] = React.useState("");
    const { userInfo } = useSelector((state) => state.login);
    const isLogin = React.useMemo(() => "userId" in userInfo, [userInfo]);

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

export const useIsLogin = () => React.useContext(Context).isLogin;

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
    return !!time && isVerify ? time + "s" : "";
};

export const useInittal = () => {
    const [, setUserPhone] = useUserPhone();
    const [, setCtcode] = useCtcode();
    const [, setAuthCode] = useAuthCode();
    const [, setUserPwd] = usePwd();
    return () => {
        setUserPhone();
        setCtcode("86");
        setAuthCode(null);
        setUserPwd("");
    };
};

export default UserHook;
