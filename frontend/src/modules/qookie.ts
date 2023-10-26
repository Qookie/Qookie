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
    eyeId: 0,
    mouthId: 0,
    level: 1,
    exp: 0,
    background: 0,
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
