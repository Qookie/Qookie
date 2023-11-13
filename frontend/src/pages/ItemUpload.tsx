import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/shared/atoms/Button';
import { adminApi } from '../api';

export default function ItemUpload() {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File>();
  const [thumbnail, setThumbnail] = useState<File>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    } else {
      console.log('no selected');
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setThumbnail(selectedImage);
    } else {
      console.log('no selected');
    }
  };

  const uploadHandler = async () => {
    await adminApi.postItemUpload({
      image: image,
      thumbnail: thumbnail,
      price: price,
      name: name,
      category: category,
    });
  };

  return (
    <Container>
      <p>아이템 업로드</p>
      <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
      <input type="text" placeholder="Category" value={category} onChange={handleCategoryChange} />
      <p>(배경, 모자, 신발, 하의, 상의, 액세서리)</p>
      <input type="number" placeholder="Price" value={price} onChange={handlePriceChange} />
      <p>이미지</p>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <p>썸네일 (선택) </p>
      <input type="file" accept="image/*" onChange={handleThumbnailChange} />
      <Button onClick={() => uploadHandler()}>업로드</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`;
