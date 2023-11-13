export interface ItemProps {
  id: number;
  media: string | null;
  name?: string;
  thumbnail?: string;
  price?: number;
  isWear?: boolean;
  isNew?: boolean;
}

export interface AllItemProps {
  background: ItemProps[];
  hat: ItemProps[];
  shoe: ItemProps[];
  bottom: ItemProps[];
  top: ItemProps[];
  accessories: ItemProps[];
}

export interface SelectedItemProps {
  background: ItemProps;
  hat: ItemProps;
  shoe: ItemProps;
  bottom: ItemProps;
  top: ItemProps;
  accessories: ItemProps[];
}

export const DefaultAllItem: AllItemProps = {
  background: [
    {
      id: 2,
      media:
        'https://bangle.s3.ap-northeast-2.amazonaws.com/a5d63241-f5f7-44ca-a40a-45b026c07d10.png',
    },
  ],
  hat: [{ id: 1, media: null }],
  shoe: [{ id: 1, media: null }],
  bottom: [{ id: 1, media: null }],
  top: [{ id: 1, media: null }],
  accessories: [{ id: 1, media: null }],
};

export const DefaultSelected: SelectedItemProps = {
  background: {
    id: 2,
    media:
      'https://bangle.s3.ap-northeast-2.amazonaws.com/a5d63241-f5f7-44ca-a40a-45b026c07d10.png',
  },
  hat: { id: 1, media: null },
  shoe: { id: 1, media: null },
  bottom: { id: 1, media: null },
  top: { id: 1, media: null },
  accessories: [{ id: 1, media: null }],
};
