import { DefaultValue, atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { QookieInfo } from '../types';

const KEY = 'QOOKIE';
const { persistAtom } = recoilPersist();

export const QookieInfoState = atom<QookieInfo>({
  // key == unique Id
  key: `${KEY}/info`,
  default: {
    name: '',
    createdAt: '',
    exp: 0,
    level: 0,
    body: '',
    extraBody: '',
    eye: '',
    mouth: '',
    hat: { id: 0, media: '' },
    top: { id: 0, media: '' },
    bottom: { id: 0, media: '' },
    shoe: { id: 0, media: '' },
    background: { id: 0, media: '' },
    accessories: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const QookieInfoSelector = selector({
  key: `${KEY}/info/selector`,
  get: async ({ get }) => {
    // Qookie 정보 불러오기
    const qookieInfo = get(QookieInfoState);
    return qookieInfo;
  },

  // [qookie, setQookie] = useRecoilState(QookieInfoState) 로 사용
  set: ({ set }, newValue) => {
    // Default Value 일 경우는 그대로 두고
    if (newValue instanceof DefaultValue) {
      return;
    }

    // Qookie Info 타입만 업데이트 및 API 호출
    set(QookieInfoState, newValue);
  },
});
