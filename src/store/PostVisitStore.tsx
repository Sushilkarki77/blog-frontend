import { Atom, atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const postVisitAtom = atomWithStorage<string[]>("postVisits", []);

export const checkPostVisitAtom: Atom<(id: string) => boolean> = atom(
  (get) => (id: string) => get(postVisitAtom).some((x) => x === id)
);

export const addPostVisitAtom = atom(
  null,
  (get, set, id: string) => {
    const postsId = get(postVisitAtom);
    if (!postsId.includes(id)) {
      set(postVisitAtom, [...postsId, id]);
    }
  }
);

export const clearStorageAtom = atom(null, (_get, set) => {
  localStorage.removeItem("postVisits");
  set(postVisitAtom, []);
});
