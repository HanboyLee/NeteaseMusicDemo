// 節流
export const throttle = function (fn, delay) {
    let prev = Date.now();
    return function () {
        let that = this;
        let args = arguments;
        let now = Date.now();
        if (now - prev >= delay) {
            fn.apply(that, args);
            prev = Date.now();
        }
    };
};

// 時間轉換
export const transforTime = (time, type) => {
    //毫秒轉換秒
    if (type === "ms") {
        time = (time / 1000).toFixed() * 1;
    }
    let hour = Math.floor(time / 3600) < 10 ? "0" + Math.floor(time / 3600) : Math.floor(time / 3600);
    let minute =
        Math.floor((time - hour * 3600) / 60) < 10
            ? "0" + Math.floor((time - hour * 3600) / 60)
            : Math.floor((time - hour * 3600) / 60);
    let second =
        time - hour * 3600 - minute * 60 < 10
            ? "0" + (time - hour * 3600 - minute * 60)
            : time - hour * 3600 - minute * 60;

    return `${hour}:${minute}:${second}`;
};

//轉換量
export const extractPlayCountHandle = (num) => {
    const cut = (b) => `${(b / 10000).toFixed()}万`;
    return num > 10000 ? cut(num) : num;
};
