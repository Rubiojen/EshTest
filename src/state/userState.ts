import {
  AtomEffect,
  atom,
  selector,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {Consts} from 'utils/globalStyles';
import {User} from 'utils/types';
import {persistAtom} from './appState';

// userAtom
export const userAtom = atom({
  key: 'userAtom',
  default: Consts.emptyUser,
  effects_UNSTABLE: [persistAtom as AtomEffect<User>],
});

export const useUser = () => useRecoilValue(userAtom);
export const useSetUser = () => useSetRecoilState(userAtom);

// userName
const userName = selector({
  key: 'userName',
  get: ({get}) => {
    const user = get(userAtom);

    return user?.userName;
  },
});

export const useUserName = () => useRecoilValue(userName);

// userIsLoggedIn
const userIsLoggedIn = selector({
  key: 'userIsLoggedIn',
  get: ({get}) => {
    const user = get(userAtom);

    return user?.isLoggedIn;
  },
});

export const useUserIsLoggedIn = () => useRecoilValue(userIsLoggedIn);
