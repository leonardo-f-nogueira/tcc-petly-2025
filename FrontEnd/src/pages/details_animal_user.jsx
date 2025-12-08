//Página de detalhes do animal

import "../Index.css";
import Header from "../components/header/header_aposLogin.jsx";
import Footer from "../components/Footer.jsx";
import { CgChevronLeftO, CgPhone } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import api from "../services/api";

import FormularioApadrinhamento from "../components/preencherInformações/FormularioApadrinhamento.jsx";
import FormularioAdocao from "../components/preencherInformações/FormularioAdocao.jsx";

import SucessoModal from "../components/modals/sucessoModal.jsx";

export default function DetalhesAnimal() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  const [petData, setPetData] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState("");

  const [tipo, setTipo] = useState("apadrinhar");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.state) {
      setLoading(false);
      setError("");
      return;
    }

    if (!id) {
      navigate("/");
      return;
    }

    async function fetchPetDetails() {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(`/animais/${id}`);
        setPetData(response.data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do pet:", err);
        if (err.response && err.response.status === 404) {
          setError("Animal não encontrado.");
        } else {
          setError(
            "Não foi possível carregar as informações deste pet. Tente novamente mais tarde."
          );
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPetDetails();
  }, [id, location.state, navigate]);

  const handleProssiga = () => {
    if (!isLogged) {
      navigate("/login/usuario", {
        state: {
          from: location.pathname,
          pet: petData,
        },
      });
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(-1);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-xl font-medium text-gray-600">
              Carregando informações do pet...
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !petData) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col justify-center items-center gap-6 p-8 text-center">
          <CgChevronLeftO className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Ops! Algo deu errado.
          </h2>
          <p className="text-lg text-red-500 max-w-md">
            {error || "Não conseguimos encontrar os dados deste animal."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
          >
            Voltar para o início
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  const name = petData.name || "";
  const info = petData.description || petData.info || "";
  const imageUrl = petData.photoUrl || petData.image || "";
  
  const age = petData.age || "Idade não informada";
  const gender = petData.gender || "Sexo não informado";

  const responsavel = petData.abrigo?.name || petData.responsavel || "ONG Responsável";
  const telefone = petData.abrigo?.phone || petData.telefone || "Telefone não informado";

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 w-full max-w-7xl mx-auto sm:p-10 px-4 pb-20">
        <div className="w-full py-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer gap-2 hover:opacity-75 transition text-gray-700"
            aria-label="Voltar"
          >
            <CgChevronLeftO className="text-4xl" />
            <span className="hidden sm:inline text-lg font-medium">Voltar</span>
          </button>
          <h1 className="text-xl sm:text-3xl font-extrabold text-gray-800">
            Detalhes do animal
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm relative">
              <img
                src={
                  imageUrl && imageUrl.startsWith("data:image")
                    ? imageUrl
                    : "/imgs/placeholder-pet.jpg"
                }
                alt={`Foto de ${name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/imgs/placeholder-pet.jpg";
                }}
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-gray-900 break-words">
                {name || "Sem Nome"}
              </h2>

              <div className="flex gap-2 my-2">
                <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                  {age}
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                  {gender}
                </span>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                {info || "Sem informações adicionais."}
              </p>
            </div>

            <div className="border-b border-gray-200" />

            <section className="space-y-4 bg-gray-50 p-6 rounded-2xl">
              <div>
                <p className="font-bold text-lg text-gray-800 mb-1">
                  Responsável
                </p>
                <p className="text-gray-700 font-medium text-lg">
                  {responsavel}
                </p>
              </div>

              <div className="space-y-3 text-base text-gray-600">
                <div className="flex items-center gap-3">
                  <CgPhone className="text-green-600 text-xl flex-shrink-0" />
                  <span className="text-gray-800 font-medium">
                    {telefone}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-bold text-2xl text-gray-800 mb-6">
                Qual seu interesse?
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 p-1 bg-gray-100 rounded-2xl">
                <button
                  onClick={() => setTipo("adotar")}
                  className={`flex-1 cursor-pointer px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                    tipo === "adotar"
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                  }`}
                >
                  Quero Adotar
                </button>

                <button
                  onClick={() => setTipo("apadrinhar")}
                  className={`flex-1 px-6 cursor-pointer py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                    tipo === "apadrinhar"
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                  }`}
                >
                  Quero Apadrinhar
                </button>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-100 p-8 rounded-3xl shadow-sm">
              {tipo === "apadrinhar" && (
                <FormularioApadrinhamento
                  petId={petData.id}
                  pet={petData}
                  onProssiga={handleProssiga}
                />
              )}

              {tipo === "adotar" && (
                <FormularioAdocao
                  petId={petData.id}
                  pet={petData}
                  onProssiga={handleProssiga}
                />
              )}
            </div>
          </div>
        </div>

        <SucessoModal
          open={showModal}
          onClose={handleCloseModal}
          message="Solicitação enviada com sucesso!"
        />
      </section>
      <Footer />
    </main>
  );
}