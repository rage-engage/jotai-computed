import { atom } from "jotai";

export interface Document {
  id: number;
  title: string;
  text: string;
}

export const documentsAtom = atom<Array<Document>>([
  {
    id: 100,
    title: "First document",
    text: "Some of these are from or about cyberpunk 2077",
  },
  {
    id: 109,
    title: "City",
    text: "It's a city of dreams... and I'm a big dreamer!",
  },
  {
    id: 302,
    title: "Night city slogan",
    text: "The City on the Edge of Tomorrow",
  },
  {
    id: 402,
    title: "Some song...",
    text: "I\"m chippin' in",
  },
  {
    id: 428,
    title: "428",
    text: "hachiko!",
  },
  {
    id: 10,
    title: "東京",
    text: "東京都",
  },
]);

export const selectedDocumentIndexAtom = atom(0);

export const currentDocumentAtom = atom(
  (get) => get(documentsAtom)[get(selectedDocumentIndexAtom)],
  (get, set, update: Document) => {
    const documents = get(documentsAtom);
    documents[get(selectedDocumentIndexAtom)] = update;
    set(documentsAtom, documents);
  }
);
