import { atom } from 'recoil';
import { Session } from '@supabase/supabase-js';

const sessionAtom = atom<Session | null>({
  key: 'session',
  default: null,
});

// eslint-disable-next-line import/prefer-default-export
export { sessionAtom };
