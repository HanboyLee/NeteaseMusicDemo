import { LoadingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled/macro";
import React from "react";
import LoadingImg from "../../asset/images/Loading.gif";
import { useAudioRef, useAudioInstance } from "../../hooks/AudioHook";
import Img from "../Image/Img";

const Video = ({ loading, videoSrc, imgSrc }) => {
    const videoWrapRef = React.useRef();
    const src = React.useMemo(() => videoSrc || "", [videoSrc]);
    const audioRef = useAudioRef();
    // 播放ＭＶ時停止音樂
    const onPlay = () => audioRef.current.pause();

    return (
        <Container ref={videoWrapRef}>
            {loading ? (
                <LoadingOutlined style={{ fontSize: videoWrapRef.current?.offsetHeight || 0 }} />
            ) : (
                <video
                    controlsList={"nodownload"}
                    onContextMenu={(e) => e.preventDefault()}
                    controls
                    autoPlay={true}
                    poster={imgSrc}
                    width={"100%"}
                    src={src}
                    onPlay={onPlay}
                />
            )}
        </Container>
    );
};
export default Video;

const Container = styled.div`
    text-align: center;
    width: 100%;
`;
