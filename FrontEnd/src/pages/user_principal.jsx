// Componente da página inicial do usuário após login

import "../Index.css";
import Header from "../components/header/header_aposLogin.jsx";
import Pesquisar from "../components/filter/Pesquisar.jsx";
import Footer from "../components/Footer.jsx";
import CardPet from "../components/cards/CardPet.jsx";
import { CgChevronDoubleDownR } from "react-icons/cg";
import { useState, useEffect } from "react";
import api from '../services/api';

export default function Inicio() {
  const [filteredPets, setFilteredPets] = useState([]);
  const [todosPets, setTodosPets] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await api.get('/animais');
        setTodosPets(response.data);
        setFilteredPets(response.data);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    }

    fetchPets();
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-5 py-10 flex flex-col gap-10">
        <p className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold">
          Conheça alguns dos nossos pets <CgChevronDoubleDownR />
        </p>

        <Pesquisar pets={todosPets} onFilterChange={setFilteredPets} />

        <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 mt-5 auto-rows-max">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => <CardPet key={pet.id} pet={pet} />)
          ) : (
            <div className="w-full col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">
                Nenhum pet encontrado.
              </p>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}