import styled from "@emotion/styled/macro";
import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRecommendSubscribe } from "../../../app/features/lasterList/recommendSongSlice";

import { ReactComponent as DoubleSeIcon } from "../../../asset/Icons/doubleSex.svg";
import { ReactComponent as GirlIcon } from "../../../asset/Icons/girl.svg";
import { ReactComponent as BoyIcon } from "../../../asset/Icons/boy.svg";
import Loading from "../../../components/Loading";

//性別對應
const genderwrap = ({ num }) => {
    switch (num) {
        case 0: {
            return <GirlIcon className="icon" />;
        }
        case 1: {
            return <BoyIcon className="icon" />;
        }
        default:
            return <DoubleSeIcon className="icon" />;
    }
};
const RecommendCollect = ({ songslistId }) => {
    const dispatch = useDispatch();
    const {
        subscribeLoading,
        subscribers: { subscribers },
    } = useSelector((state) => state.recommendSong);

    React.useEffect(() => {
        dispatch(getRecommendSubscribe({ id: songslistId, limit: 100 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (subscribeLoading) {
        return <Loading />;
    }

    return (
        <Container>
            {subscribers.map((item) => {
                return (
                    <AvatarWrap key={item.userId}>
                        <Avatar size={"large"} src={item.avatarUrl} />
                        <div className="name">{item.nickname}</div>
                        {genderwrap({ num: item.gender })}
                    </AvatarWrap>
                );
            })}
        </Container>
    );
};

export default RecommendCollect;
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;
const AvatarWrap = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-basis: 30%;
    & .icon {
        margin-left: auto;
        width: 32px;
        height: 32px;
    }
    & .name {
        margin: auto;
    }
`;
