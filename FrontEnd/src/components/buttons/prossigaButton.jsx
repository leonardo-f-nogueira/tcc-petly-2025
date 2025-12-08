import { useState } from "react";

export default function ConfirmButton() {
  const [ConfirmButton, setConfirmButton] = useState("Clique aqui e prossiga");

  return (
    <section className="w-[300px]">
      <button
        onClick={() => setConfirmButton("Clique aqui e prossiga")}
        className="
          bg-[#FFF75A]
          w-full
          h-[40px]
          flex
          items-center
          justify-center
          transition-transform
          duration-200
          ease-out
          hover:scale-105
          rounded-[10px]
          border-1
          border-[#646464]
          font-medium
        "
      >
        Prossiga
      </button>
    </section>
  );
}
