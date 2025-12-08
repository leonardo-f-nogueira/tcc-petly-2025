// Componente de filtro dos animais
import { useState } from "react";
import { CgSearch } from "react-icons/cg";

export default function Pesquisar({ pets, onFilterChange }) {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");

  function handleFilter() {
    const filtered = pets.filter((pet) => {
      return (
        pet.name.toLowerCase().includes(search.toLowerCase()) &&
        (species ? pet.species === species : true) &&
        (gender ? pet.gender === gender : true)
      );
    });

    onFilterChange(filtered);
  }

  return (
    <section className="flex justify-between gap-5 w-full">
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-xl w-[500px]"
        />
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-xl"
        >
          <option value="">Espécie</option>
          <option value="dog">Cachorro</option>
          <option value="cat">Gato</option>
          <option value="hamster">Hamster</option>
        </select>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-xl"
        >
          <option value="">Sexo</option>
          <option value="male">Macho</option>
          <option value="female">Fêmea</option>
        </select>
      </div>

      <button
        id="prossigaButton"
        onClick={handleFilter}
        className="bg-[#1D9C19] justify-center rounded-full text-white cursor-pointer font-normal px-6 py-5"
      >
        <CgSearch className="text-[20px] inline-block" />
      </button>
    </section>
  );
}