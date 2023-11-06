import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { User } from "@firebase/auth";

const { persistAtom } = recoilPersist();

export const UserState = atom<User | null>({
	key: 'userState',
	default: null,
	effects_UNSTABLE: [persistAtom]
})

