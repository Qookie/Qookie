import React, { useState } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Time } from '../../../../pages/SetWakeupTime';

interface Props {
  time: Time;
  onSelectHour?: (hour: string) => void;
  onSelectMinute?: (minute: string) => void;
  onSelectMeridiem?: (day: string) => void;
}

const hours = Array(12)
  .fill(0)
  .map((v, i) => (v = String(i + 1).padStart(2, '0')));

const minutes = Array(60)
  .fill(0)
  .map((v, i) => (v = String(i).padStart(2, '0')));

const meridiem = ['AM', 'PM'];

function TimePicker({ time, onSelectHour, onSelectMinute, onSelectMeridiem }: Props) {
  return (
    <Container>
      <PickerContainer>
        <SwiperContainer>
          <Swiper
            slidesPerView={4}
            loop={true}
            direction="vertical"
            centeredSlides={true}
            initialSlide={(parseInt(time.hour) % 12 ? parseInt(time.hour) % 12 : 12) - 1}
            onTransitionEnd={(swiper: SwiperClass) => {
              onSelectHour?.(hours[swiper.realIndex]);
            }}
          >
            {hours.map((no: string) => (
              <SwiperSlide key={no}>
                {({ isActive }) => (
                  <SwiperItem className={isActive ? 'active' : ''}>{no}</SwiperItem>
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
            initialSlide={parseInt(time.minute)}
            onTransitionEnd={(swiper: SwiperClass) => {
              onSelectMinute?.(minutes[swiper.realIndex]);
            }}
          >
            {minutes.map((no: string) => (
              <SwiperSlide key={no}>
                {({ isActive }) => (
                  <SwiperItem className={isActive ? 'active' : ''}>{no}</SwiperItem>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>

        <SwiperContainer>
          <Swiper
            loop={false}
            slidesPerView={4}
            direction="vertical"
            centeredSlides={true}
            initialSlide={parseInt(time.hour) >= 12 ? 1 : 0}
            onTransitionEnd={(swiper: SwiperClass) => {
              onSelectMeridiem?.(meridiem[swiper.realIndex]);
            }}
          >
            {meridiem.map((no: string) => (
              <SwiperSlide key={no}>
                {({ isActive }) => (
                  <SwiperItem className={isActive ? 'active' : ''}>{no}</SwiperItem>
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

export default TimePicker;
