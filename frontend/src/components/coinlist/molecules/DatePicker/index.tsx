import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Date } from '../../../../pages/Coinlist';

interface Props {
  date: Date;
  onSelectYear?: (year: string) => void;
  onSelectMonth?: (month: string) => void;
}

const years = ['2023', '2024'];

const months = Array(12)
  .fill(0)
  .map((v, i) => (v = String(i + 1)));

export default function DatePicker({ date, onSelectYear, onSelectMonth }: Props) {
  return (
    <Container>
      <PickerContainer>
        <SwiperContainer>
          <Swiper
            slidesPerView={4}
            loop={true}
            direction="vertical"
            centeredSlides={true}
            initialSlide={parseInt(date.year) - 2023}
            onTransitionEnd={(swiper: SwiperClass) => {
              onSelectYear?.(years[swiper.realIndex]);
            }}
            onSlideChange={(swiper) => console.log(swiper.realIndex + 2023)}
          >
            {years.map((no: string) => (
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
            slidesPerView={4}
            loop={true}
            direction="vertical"
            centeredSlides={true}
            initialSlide={parseInt(date.month)}
            onTransitionEnd={(swiper: SwiperClass) => {
              onSelectMonth?.(months[swiper.realIndex]);
            }}
            onSlideChange={(swiper) => console.log(swiper.realIndex + 1)}
          >
            {months.map((no: string) => (
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
  border-top: 2px solid var(--MR_GRAY1);
  border-bottom: 2px solid var(--MR_GRAY1);
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
  width: 100%;
  height: 50px;
  background-color: rgba(224, 224, 224, 0.25);
  border-radius: 8px;
`;
