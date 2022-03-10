export const setStorge = ({ key, value }) => localStorage.setItem(key, JSON.stringify(value));
export const getStorge = ({ key }) => JSON.parse(localStorage.getItem(key));
export const clearStroge = () => localStorage.clear();
