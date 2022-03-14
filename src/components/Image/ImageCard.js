import React from "react";

import styled from "@emotion/styled/macro";
import { themeConstant } from "../../configs/constant";
import { NavLink } from "react-router-dom";
import Img from "./Img";
import { extractPlayCountHandle } from "../../utils/common";
import { CustomerServiceFilled } from "@ant-design/icons";
const ImageCard = ({ id, navigateTo, picUrl, name, playCount }) => {
    const hasPlayCount = React.useMemo(() => playCount || playCount === 0, [playCount]);
    return (
        <Link replace={true} to={`/${navigateTo}${id}`}>
            <ImageBox>
                <ImageItem alt="example" src={picUrl + "?param=500y500"} preview={false} />
            </ImageBox>
            <Text>{name}</Text>
            {hasPlayCount && (
                <PlayCount>
                    <div className="count">
                        <CustomerServiceFilled className="icon" />
                        {extractPlayCountHandle(playCount)}
                    </div>
                </PlayCount>
            )}
        </Link>
    );
};

const ImageItem = styled(Img)`
    display: block;
    width: 100%;
    object-fit: cover;
    transition: all 0.3s ease-in;
    border-radius: 5px;
    overflow: hidden;
    &:hover {
        box-shadow: ${({ theme }) => theme[themeConstant.boxShadowBase]};
    }
`;
const ImageBox = styled.div`
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;
`;

const Text = styled.div`
    text-align: center;
    font-size: 1.1rem;
    cursor: pointer;
`;
const Link = styled(NavLink)`
    color: #000;
    text-decoration: none;
    display: block;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
`;
const PlayCount = styled.div`
    padding: 1rem 0;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);

    /* background-color: #f00; */
    & .count {
        position: absolute;
        top: 5px;
        right: 10px;
        color: #fff;
        .icon {
            margin-right: 0.5rem;
        }
    }
`;
export default ImageCard;
