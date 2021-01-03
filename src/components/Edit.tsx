import React, { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { currentDocumentAtom } from "../store/Document";
import { diff } from "../util/Object";
import "../index.css";

export default function Edit() {
  const [currentDocument, setCurrentDocument] = useAtom(currentDocumentAtom);
  const [doc, setDoc] = useState(currentDocument);

  useEffect(() => {
    setDoc(currentDocument);
  }, [currentDocument]);

  const resetData = useCallback(() => {
    setDoc(currentDocument);
  }, [currentDocument]);

  const changeData = useCallback(() => {
    // First check if the object has changed
    const { hasChanged } = diff(currentDocument, doc);
    if (
      hasChanged &&
      window.confirm("Record has changed, are you sure you want to update?")
    ) {
      setCurrentDocument(doc);
    }
  }, [currentDocument, doc, setCurrentDocument]);

  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoc({
      ...doc,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <h3>Edit section</h3>

      {/* 
        Inputs
       */}
      <div>
        <label htmlFor="id">
          ID:{" "}
          <input
            type="text"
            id="id"
            name="id"
            value={doc.id}
            className={"input"}
          />
        </label>
      </div>

      <div>
        <label htmlFor="title">
          Title:{" "}
          <input
            type="text"
            id="title"
            name="title"
            value={doc.title}
            className={"input"}
            onChange={setValue}
          />
        </label>
      </div>

      <div>
        <label htmlFor="text">
          Text:{" "}
          <input
            type="text"
            id="text"
            name="text"
            value={doc.text}
            className={"input"}
            onChange={setValue}
          />
        </label>
      </div>

      {/* 
        Buttons
       */}
      <button type="button" onClick={resetData}>
        Reset
      </button>
      <button type="button" onClick={changeData}>
        Change
      </button>
    </>
  );
}
