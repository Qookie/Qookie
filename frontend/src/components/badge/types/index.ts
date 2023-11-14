export type BadgeConditionalImage = {
  firstBadge: {
    condition: number;
    url: string | null;
  };
  secondBadge: {
    condition: number;
    url: string | null;
  };
  thirdBadge: {
    condition: number;
    url: string | null;
  };
};

export type Badges = {
  [key in BadgeCategory]: BadgeConditionalImage;
};

export const BadgeCategoryList = [
  'eat',
  'wake',
  'photo',
  'squat',
  'meditation',
  'attendance',
  'buy_new',
] as const;

export type BadgeCategory = (typeof BadgeCategoryList)[number];
