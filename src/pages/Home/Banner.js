import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { themeConstant } from "../../configs/constant";
import styled from "@emotion/styled/macro";
import { Typography } from "antd";
import Img from "../../components/Image/Img";

const Banner = ({ bannerList }) => {
    return (
        <SwiperWrap
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
                delay: 3000,
            }}
            coverflowEffect={{
                rotate: 90,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: true,
            }}
            pagination={{
                dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
        >
            {bannerList.map((item, i) => {
                return (
                    <SwiperSlide key={i}>
                        <SwiperItem>
                            <Img src={item.imageUrl} />
                            <Typography.Title level={5} className="title" style={{ background: item.titleColor }}>
                                {item.typeTitle}
                            </Typography.Title>
                        </SwiperItem>
                    </SwiperSlide>
                );
            })}
        </SwiperWrap>
    );
};

const SwiperWrap = styled(Swiper)`
    width: 100%;
    text-align: center;
`;
const SwiperItem = styled.div`
    position: relative;
    width: 100%;
    border-radius: ${({ theme }) => theme[themeConstant.borderRadiusBase]};
    overflow: hidden;
    & .ant-image {
        width: 100%;
    }
    & .title {
        position: absolute;
        right: 0;
        bottom: 0;
        border-radius: 10px 0 0 0px;
        padding: 0.5rem;
        margin: 0;
    }
`;

export default Banner;
