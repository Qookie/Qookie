import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

interface Props {
  onSelectYear?: (year: number) => void;
  onSelectMonth?: (month: number) => void;
  year: number;
  month: number;
}

const years = [2023, 2024];

const months = Array(12)
  .fill(0)
  .map((v, i) => (v = i + 1));

export default function DatePicker({ year, month, onSelectYear, onSelectMonth }: Props) {
  return (
    <Container>
      <PickerContainer>
        <SwiperContainer>
          <Swiper
            slidesPerView={3}
            loop={false}
            direction="vertical"
            centeredSlides={true}
            initialSlide={years.findIndex((y: number) => y === year)}
            onTransitionEnd={(swiper: SwiperClass) => {
              onSelectYear?.(years[swiper.realIndex]);
            }}
          >
            {years.map((no: number) => (
              <SwiperSlide key={no}>
                {({ isActive }) => (
                  <SwiperItem className={isActive ? 'active' : ''}>{no}년</SwiperItem>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
        <SwiperContainer>
          <Swiper
            slidesPerView={3}
            loop={true}
            direction="vertical"
            centeredSlides={true}
            initialSlide={months.findIndex((m: number) => m === month)}
            onTransitionEnd={(swiper: SwiperClass) => {
              onSelectMonth?.(months[swiper.realIndex]);
            }}
          >
            {months.map((no: number) => (
              <SwiperSlide key={no}>
                {({ isActive }) => (
                  <SwiperItem className={isActive ? 'active' : ''}>{no}월</SwiperItem>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
      </PickerContainer>
      <Selected />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding: 1rem 0;
`;

const PickerContainer = styled.div`
  display: flex;
  width: fit-content;
  margin: 0 auto;
`;

const SwiperContainer = styled.div`
  margin-right: 2rem;

  .swiper {
    width: 100%;
    height: 200px;
  }

  .swiper-slide {
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SwiperItem = styled.div`
  color: var(--MR_GRAY2);
  font-weight: 600;
  font-size: 24px;

  &.active {
    color: var(--MR_BLACK);
  }
`;

const Selected = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 10rem;
  height: 50px;
  background-color: rgba(224, 224, 224, 0.25);
  border-radius: 8px;
`;
