import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import FaceOptionItem from '../../atoms/FaceOptionItem';
import { FaceOption } from '../../types';
import Text from '../../../shared/atoms/Text';

interface Props {
  label?: string;
  optionData?: FaceOption[];
  selected: number;
  onSelectItem: (id: number) => void;
}

function FaceOptionSelctor({ label, optionData, onSelectItem, selected }: Props) {
  return (
    <>
      <Text typography="main" color="var(--MR_GRAY2)">
        {label}
      </Text>
      <SwiperContainer>
        <Swiper slidesPerView={'auto'} spaceBetween={16}>
          {optionData
            ? optionData.map(({ image, id }) => (
                <SwiperSlide key={id}>
                  <FaceOptionItem onClick={() => onSelectItem(id)} selected={id === selected}>
                    <img src={image} alt={`${id}`} />
                  </FaceOptionItem>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </SwiperContainer>
    </>
  );
}

const SwiperContainer = styled.div`
  .swiper {
    width: 100%;
  }

  .swiper-slide {
    width: fit-content;
  }
`;

export default FaceOptionSelctor;
