import { CaretDownOutlined } from '@ant-design/icons';
import styled from '@emotion/styled/macro';
import { Divider, Pagination, Drawer, Button, Typography, Empty } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getRecommendTags, onClickCat, onCurrentChange } from '../../app/features/lasterList/recommendSongSlice';
import Loading from '../../components/Loading';
import Option from '../../components/Option';

import Lists from './Lists';

const RecommenedSongs = () => {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const dispatch = useDispatch();
    const { loading, tagbar, queryInfo, total, hotTagbar } = useSelector((state) => state.recommendSong);

    React.useEffect(() => {
        dispatch(getRecommendTags());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (current) => {
        dispatch(onCurrentChange(current));
    };
    const onClose = () => setOpenDrawer(false);
    const onTapCat = (selected) => {
        onClose();
        return onClickCat(selected);
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <Container>
            {/* 導覽 */}
            <TagsWrap>
                <Tags>
                    <Typography.Title className="title" type="danger" level={4}>
                        全部
                    </Typography.Title>
                    <Button onClick={() => setOpenDrawer((prev) => !prev)}>
                        歌单标签 <CaretDownOutlined />
                    </Button>
                </Tags>

                <Option data={hotTagbar} category={queryInfo.cat} onClick={onTapCat} />
            </TagsWrap>
            <Drawer
                title="全部歌单标签"
                placement={'top'}
                closable={false}
                onClose={onClose}
                visible={openDrawer}
                keyboard
                contentWrapperStyle={{
                    height: 'auto',
                    boxShadow: '8px 6px 10px',
                    overflow: 'hidden',
                    borderRadius: '0 0 5px 5px',
                }}
            >
                {tagbar.map((item) => {
                    return (
                        <Option
                            key={item.id}
                            title={item.name}
                            data={item.tags}
                            category={queryInfo.cat}
                            onClick={onTapCat}
                        />
                    );
                })}
            </Drawer>
            <Divider />
            <Lists queryInfo={queryInfo} />
            {total ? (
                <PaginationWrap>
                    <Pagination
                        showLessItems
                        onChange={onChange}
                        current={queryInfo.num}
                        total={total}
                        showSizeChanger={false}
                    />
                </PaginationWrap>
            ) : (
                <Empty />
            )}
        </Container>
    );
};
const TagsWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Tags = styled.div`
    display: flex;
    align-items: center;
    & .title {
        margin: 0 !important;
        margin-right: 0.5rem !important;
    }
`;
const Container = styled.div`
    width: 100%;
    padding: 1rem;
    position: relative;
`;
const PaginationWrap = styled.div`
    margin-top: 1rem;
    text-align: center;
`;

export default RecommenedSongs;
