import { useNavigate } from "react-router-dom";

export default function InitialCard({ id, image, name, info, sobre_min }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detalhes/${id}`, {
      state: { id, image, name, info, sobre_min },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="
        cursor-pointer 
        flex 
        flex-col
        gap-4
        w-full
        max-w-[240px]
      "
    >
      <div className="w-full aspect-square overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col leading-tight px-1">
        <p className="font-semibold text-base text-[#222]">{name}</p>
        <p className="text-sm text-gray-600">{info}</p>

        {sobre_min && (
          <p className="text-sm font-medium text-gray-800">
            {sobre_min}
          </p>
        )}
      </div>
    </div>
  );
}
