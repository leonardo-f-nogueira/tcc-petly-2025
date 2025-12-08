import { useNavigate } from "react-router-dom";

export default function InitialButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login/usuario");
  };

  return (
    <section className="relative flex justify-center my-10">
      <div
        className="
          absolute 
          top-1/2 
          -translate-y-1/2
          bg-[#CDCDCD]
          h-[1px]
          w-[1150px]
          z-0 
        "
      ></div>

      <button
        onClick={handleClick}
        className="
          bg-[#FFFD5C]
          w-[280px]
          h-[40px]
          flex
          items-center
          justify-center
          transition-transform
          duration-200
          ease-out
          hover:scale-105
          active:scale-95
          rounded-[10px]
          border
          border-[#646464]
          font-medium
          relative
          z-10
          cursor-pointer
          text-black
        "
      >
        Clique aqui e conheça mais
      </button>
    </section>
  );
}
