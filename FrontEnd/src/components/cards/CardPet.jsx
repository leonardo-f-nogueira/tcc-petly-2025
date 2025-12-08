// Exibe um card com as informações de um pet, levando para a página de detalhes.
import { useNavigate } from "react-router-dom";

export default function CardPet({ pet }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detalhes/${pet.id}`, {
      state: pet,
    });
  };

  const formattedSpecies = pet.species
    ? pet.species.charAt(0).toUpperCase() + pet.species.slice(1)
    : "Pet";

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-gray-100 rounded-[20px] p-4 hover:shadow transition"
    >
      <img
        src={pet.photoUrl}
        alt={pet.name}
        className="w-full h-70 object-cover rounded-lg"
      />
      <div className="p-5">
        <p className="mt-3 font-semibold text-lg">{pet.name}</p>
        <p className="text-sm text-gray-600">
          {formattedSpecies}, {pet.age}
        </p>
      </div>
    </div>
  );
}
