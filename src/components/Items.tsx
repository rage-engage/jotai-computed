import React from "react";
import { useAtom } from "jotai";
import { documentsAtom, selectedDocumentIndexAtom } from "../store/Document";

export default function Items() {
  const [documents] = useAtom(documentsAtom);
  const [, setDocumentIndex] = useAtom(selectedDocumentIndexAtom);
  console.log("Document is", documents);

  const handleClick = (index: number) => {
    setDocumentIndex(index);
  };

  return (
    <div>
      Items: <br />
      {documents.map((document, i) => (
        <div key={document.id}>
          <button type="button" onClick={() => handleClick(i)}>
            {document.title}
          </button>
        </div>
      ))}
    </div>
  );
}
