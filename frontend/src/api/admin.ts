import { http } from './instance';

export interface postItemReqProps {
  image?: File;
  thumbnail?: File;
  price: number;
  name: string;
  category: string;
}

interface postItemResponse {
  msg: string;
  payload: string;
}

const postItemUpload = async (body: postItemReqProps) => {
  try {
    const formData = new FormData();
    console.log(body);
    body.image && formData.append('image', body.image);
    body.thumbnail && formData.append('thumbnail', body.thumbnail);
    formData.append('price', body.price.toString());
    formData.append('name', body.name);
    formData.append('category', body.category);

    const res = await http.post<postItemResponse>(`/api/item/upload`, formData, true);
    console.log('itemRes', res);
    return res;
  } catch (e) {
    console.log('postItemUpload', e);
  }
};

const admin = { postItemUpload };
export default admin;
