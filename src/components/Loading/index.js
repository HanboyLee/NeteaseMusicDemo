import styled from "@emotion/styled/macro";
import React from "react";
import { CubeGrid } from "better-react-spinkit";

const Loading = ({ styles = {} }) => {
    const loadRef = React.useRef();
    const [restHight, setRestHight] = React.useState(0);
    React.useEffect(() => {
        const { top } = loadRef.current?.getBoundingClientRect();
        setRestHight(window.innerHeight - top);
        // height: 18;
        // top: 300.484375;
        // y: 300.484375;
    }, []);

    return (
        <LoadWrap ref={loadRef}>
            <CubeGrid color="#EEEEEE" size={restHight} />
        </LoadWrap>
    );
};

const LoadWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Loading;
