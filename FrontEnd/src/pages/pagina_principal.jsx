// Página principal do site
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgSpinner, CgArrowRight } from "react-icons/cg";
import api from "../services/api";

import Header from "../components/header/headerPrincipal.jsx";
import Footer from "../components/Footer.jsx";
import CardAdotante from "../components/cards/cta_adodante.jsx";
import CardONG from "../components/cards/cta_ong.jsx";
import Initial from "../components/buttons/botao_conheçaMais.jsx";

export default function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPetsPublicos() {
      try {
        const response = await api.get("/animais/publico");
        setPets(response.data);
      } catch (error) {
        console.error("Erro ao buscar vitrine de pets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPetsPublicos();
  }, []);

  return (
    <main>
      <Header />

      <section className="w-full md:p-14">
        <div className="w-full max-w-[1150px] mx-auto">
          <img
            src="/imgs/TR.png"
            alt="Banner Petly"
            className="w-full h-[260px] object-cover rounded-none md:rounded-2xl"
          />
        </div>

        <section className="flex flex-col gap-10 w-full max-w-[1150px] mx-auto mt-10 px-4 md:px-0">
          <p className="text-2xl font-extrabold text-gray-800">
            Vamos iniciar essa jornada?
          </p>

          <section className="flex flex-col md:flex-row gap-10">
            <CardAdotante />
            <CardONG />
          </section>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-extrabold text-gray-800">
                Conheça alguns amigos esperando um lar
              </p>
              <Link
                to="/login/usuario"
                className="text-green-600 font-bold hover:underline flex items-center gap-1 text-sm md:text-base"
              >
                Ver todos <CgArrowRight />
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <CgSpinner size={40} className="animate-spin text-green-600" />
              </div>
            ) : pets.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-200">
                <p className="text-gray-500">
                  Nenhum pet disponível no momento. Volte logo!
                </p>
              </div>
            ) : (
              <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
                {pets.slice(0, 6).map((pet) => (
                  <div
                    key={pet.id}
                    className="min-w-[280px] md:min-w-[320px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition snap-center flex flex-col"
                  >
                    <div className="h-48 w-full bg-gray-200 relative">
                      <img
                        src={
                          pet.photoUrl && pet.photoUrl.startsWith("data:image")
                            ? pet.photoUrl
                            : "/imgs/placeholder-pet.jpg"
                        }
                        alt={pet.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/imgs/placeholder-pet.jpg";
                        }}
                      />
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        Disponível
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {pet.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        {pet.species} • {pet.size}
                      </p>
                      <p className="text-xs text-gray-400 mb-4">
                        📍 {pet.abrigo?.address || "Localização não informada"}
                      </p>

                      <Link to="/login/usuario" className="mt-auto">
                        <button className="w-full py-2 bg-green-50 text-green-700 font-bold rounded-lg hover:bg-green-100 transition">
                          Quero Adotar
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center my-10">
            <Initial />
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}
