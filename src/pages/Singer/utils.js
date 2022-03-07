export const transforArr = (data, initText) => {
    return data.map((item) => {
        let extractId = item === initText ? -1 : item;
        return { id: extractId, name: item };
    });
};
