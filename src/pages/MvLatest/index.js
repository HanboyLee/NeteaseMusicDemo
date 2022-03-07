import styled from "@emotion/styled/macro";
import { Pagination } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getMvAllList,
    onClickSort,
    onClickArea,
    onClickType,
    onCurrentChange,
    onCurrentChangePage,
} from "../../app/features/lasterList/mvLatestListSlice";
import Option from "../../components/Option";
import CardLists from "./CardLists";

const MvLatest = () => {
    const dispatch = useDispatch();
    const { mvList, TarBar, queryInfo, loading, mvCount } = useSelector((state) => state.mvLatestList);
    console.log(mvList);

    React.useEffect(() => {
        console.log(queryInfo);
        //初始化
        dispatch(getMvAllList(queryInfo));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryInfo]);
    // useSelector((state) => state);

    const onPagination = (current, pageSize) => {
        const { limit } = queryInfo;
        dispatch(onCurrentChange({ offset: current * limit }));
        dispatch(onCurrentChangePage({ num: current }));
    };
    return (
        <Container>
            <Option category={queryInfo.area} title={"地区"} data={TarBar.TarBarArea} onClick={onClickArea} />
            <Option category={queryInfo.type} title={"类型"} data={TarBar.TarBarType} onClick={onClickType} />
            <Option category={queryInfo.order} title={"排序"} data={TarBar.TarBarOrder} onClick={onClickSort} />
            <CardListWrap>
                <CardLists datas={mvList} loading={loading} />
            </CardListWrap>
            <Pagination
                style={{ textAlign: "center" }}
                showLessItems
                onChange={onPagination}
                current={queryInfo.num}
                total={mvCount}
                showSizeChanger={false}
                pageSize={30}
            />
        </Container>
    );
};

export default MvLatest;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;
const CardListWrap = styled.div`
    padding: 1rem;
`;
