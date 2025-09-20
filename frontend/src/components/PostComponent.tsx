// src/components/PostComposer.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { BsImages } from "react-icons/bs";
import logo from "./assets/logo-transp.png"

type PostComposerProps = {
  avatarUrl: string;
  onPublish: (text: string) => void;
};

export default function PostComponent({ avatarUrl, onPublish }: PostComposerProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onPublish(t);
    setText("");
  }

  return (
    <div className=" w-full max-w-sm md:max-w-none">
  <form className="formPost" onSubmit={handleSubmit}>
    <textarea
      className="w-full resize-none bg-red-100 border-none outline-none p-5 rounded"
      name="textarea"
      placeholder="Vamos reciclar?"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <div className="iconsAndButton mt-2 flex items-center gap-2">
      <button
        className="btnFileForm"
        type="button"
        aria-label="Imagem"
      >
        <BsImages size={20} />
      </button>
      <button type="submit" className="btnSubmit">
        Publicar
      </button>
    </div>
  </form>
</div>

  );
}
