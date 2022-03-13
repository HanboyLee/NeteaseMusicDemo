import { Col, Pagination, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { getAlbum } from "../../../app/features/singer/singerDetailSlice";
import ImageCard from "../../../components/Image/ImageCard";

const AlbumsContent = ({ datas, ...props }) => {
    const dispatch = useDispatch();
    const onChange = (current, pageSize) => {
        dispatch(getAlbum({ id: props.id, offset: current * 30 }));
    };
    return (
        <Row xs={24} md={6} gutter={30}>
            {datas.map((item) => {
                return (
                    <Col key={item.id} xs={24} md={6}>
                        <ImageCard navigateTo={"album/"} {...item} />
                    </Col>
                );
            })}
            <Col xs={24} style={{ textAlign: "center" }}>
                <Pagination
                    showLessItems
                    onChange={onChange}
                    defaultCurrent={1}
                    total={props.albumSize - 30}
                    showSizeChanger={false}
                    pageSize={30}
                />
            </Col>
        </Row>
    );
};

export default AlbumsContent;
