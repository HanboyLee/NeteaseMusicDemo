import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled/macro";
import { Row, Pagination, Col } from "antd";

//actions
import {
    singerAsync,
    onClickArea,
    onClickCategory,
    onClickInitial,
    onCurrentChange,
    onSize,
} from "../../app/features/singer/singerSlice";
//componets
import Option from "../../components/Option";
import ImageCard from "../../components/Image/ImageCard";

//utils
import { transforArr } from "./utils";

const Singer = () => {
    const singer = useSelector((state) => state.singer);
    const dispatch = useDispatch();
    //初始化 & 更新
    React.useEffect(() => {
        dispatch(singerAsync(singer.queryInfo));
    }, [singer.queryInfo, dispatch]);

    const onChange = (current, pageSize) => {
        const { limit } = singer.queryInfo;
        dispatch(onCurrentChange({ offset: current * limit }));
    };
    const onShowSizeChange = (size) => {
        dispatch(onSize({ limit: size }));
    };
    return (
        <Container>
            {/* 選項 */}
            <Option title="语种" data={singer.navBar.area} onClick={onClickArea} category={singer.queryInfo.area} />
            <Option title="分类" data={singer.navBar.type} onClick={onClickCategory} category={singer.queryInfo.type} />
            <Option
                title="筛选"
                data={transforArr(singer.initial, singer.initial_)}
                onClick={onClickInitial}
                category={singer.queryInfo.initial}
            />
            {/* 列表 */}
            <ImageListsRow gutter={[10, 30]}>
                {singer.artists.map((item) => {
                    return (
                        <Col key={item.id} xs={24} md={6}>
                            <ImageCard navigateTo={"singer/"} {...item} />
                        </Col>
                    );
                })}
                <Col xs={24} style={{ textAlign: "center" }}>
                    <Pagination
                        onChange={onChange}
                        defaultCurrent={1}
                        total={950}
                        pageSize={30}
                        onShowSizeChange={onShowSizeChange}
                    />
                </Col>
            </ImageListsRow>
        </Container>
    );
};

const ImageListsRow = styled(Row)`
    padding-top: 2rem;
    height: 100%;
`;

const Container = styled.div`
    height: 100%;
`;

export default Singer;
