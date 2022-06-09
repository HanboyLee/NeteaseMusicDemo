import React from 'react';

import { Empty } from 'antd';

export const useIsFetchEmptyData = (data) => {
    const isEmpty = React.useMemo(() => !data || !data.length, [data]);
    return (Com) => (isEmpty ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : Com);
};
