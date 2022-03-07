import { FolderAddOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { themeConstant } from "../../configs/constant";
import { useOnSaveSongAllBtn } from "../../hooks/AudioHook";

const PlayListAllBtn = ({ datas, isTooMuch }) => {
    const onSaveSongAllBtn = useOnSaveSongAllBtn({ isTooMuch });
    return (
        <Container>
            <div className="saveSongAllBtn" onClick={() => onSaveSongAllBtn(datas)}>
                <FolderAddOutlined className="icon" />
                <span className="txt">播放全部</span>
            </div>
        </Container>
    );
};
const Container = styled.div`
    max-width: 140px;
    background-color: red;
    border-radius: ${({ theme }) => theme[themeConstant.borderRadiusBase]};
    margin-top: 0.5rem;
    padding: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    & .saveSongAllBtn {
        padding-left: 0.1rem;
        color: white;
        .icon {
            font-size: 1.2rem;
        }
        .txt {
            display: inline-block;
            padding-left: 0.5rem;
        }
    }
    :hover {
        background-color: #b00;
    }
`;
export default PlayListAllBtn;
