import React from "react";
import Moment from "moment";
import styled from "@emotion/styled/macro";
import { Typography, Statistic } from "antd";
import { FieldTimeOutlined, PlayCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { themeConstant } from "../../configs/constant";
import { extractPlayCountHandle } from "../../utils/common";

const VideoImage = ({ vid, imgurl, cover, name, title, playCount, duration, durationms }) => {
    //時間處理
    const dur = React.useMemo(() => Moment(duration || durationms).format("mm:ss"), [duration, durationms]);

    const statisticStyle = { color: "#fff", fontSize: `1rem` };
    return (
        <>
            <VideoImgBox src={imgurl ? imgurl : cover}>
                {!vid && (
                    <Statistic
                        valueStyle={statisticStyle}
                        value={extractPlayCountHandle(playCount)}
                        prefix={<EyeOutlined />}
                        className={"playCount"}
                    />
                )}
                <PlayCircleOutlined className={"playCircle"} />
                <Statistic
                    valueStyle={statisticStyle}
                    value={dur}
                    prefix={<FieldTimeOutlined />}
                    className={"duration"}
                />
            </VideoImgBox>
            <ImgName strong={true} ellipsis={true}>
                {name || title}
            </ImgName>
        </>
    );
};
<FieldTimeOutlined />;

const ImgName = styled(Typography.Text)`
    width: 100%;
    text-align: center;
    font-size: 1.1rem;
`;
const VideoImgBox = styled.div`
    height: 150px;
    position: relative;
    border: 1px solid;
    background-image: ${(props) => `url(${props.src})`};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: ${({ theme }) => theme[themeConstant.borderRadiusBase]};
    & .playCount {
        position: absolute;
        top: 5%;
        left: 5%;
    }
    & .duration {
        position: absolute;
        bottom: 5%;
        right: 5%;
    }
    & .playCircle {
        font-size: 3rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.2s ease-in-out;
        color: #ccc;
    }
    &:hover {
        .playCircle {
            color: #000;
        }
    }
`;

export default VideoImage;
