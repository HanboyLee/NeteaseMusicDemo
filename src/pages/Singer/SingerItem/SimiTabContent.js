import styled from '@emotion/styled/macro';
import { Row, Col } from 'antd';
import React from 'react';
import ImageCard from '../../../components/Image/ImageCard';

const SimiTabContent = ({ datas }) => {
    return (
        <Container>
            <ListItem gutter={[20, 30]}>
                {datas.map((item) => (
                    <Col key={item.id} xs={24} md={6}>
                        <ImageCard navigateTo={'singer/'} {...item} />
                    </Col>
                ))}
            </ListItem>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
`;
const ListItem = styled(Row)`
    width: 100%;
    height: 100%;
`;
export default SimiTabContent;
