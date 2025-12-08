// Tela "Meus Pets" do dashboard da ONG.
import { useState, useEffect } from "react";
import { CgPen, CgTrash, CgSpinner } from "react-icons/cg";
import api from "../../services/api";

export default function List({ setActiveView, setPetToEdit }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMeusPets() {
      try {
        const response = await api.get("/animais/abrigo/meus-pets");
        setPets(response.data);
      } catch (err) {
        console.error("Erro ao buscar pets da ONG:", err);
        setError("Não foi possível carregar seus pets no momento.");
      } finally {
        setLoading(false);
      }
    }

    fetchMeusPets();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir este pet?")) return;

    try {
      setLoading(true);
      await api.delete(`/animais/${id}`);
      setPets(pets.filter((pet) => pet.id !== id));
      alert("Pet excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir pet:", err);
      alert("Erro ao excluir o pet. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (pet) => {
    if (setPetToEdit) {
      setPetToEdit(pet);
    }
    setActiveView("cadastrar");
  };

  const handleNew = () => {
    if (setPetToEdit) {
      setPetToEdit(null);
    }
    setActiveView("cadastrar");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 gap-4">
        <CgSpinner size={40} className="animate-spin text-green-600" />
        <p>Carregando seus pets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600 bg-red-50 rounded-xl">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section>
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Meus Pets</h1>
        <button
          onClick={handleNew}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition flex items-center gap-2"
        >
          + Novo Pet
        </button>
      </header>

      {pets.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-500 mb-4">
            Você ainda não tem pets cadastrados.
          </p>
          <p className="text-gray-400">Clique em "+ Novo Pet" para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
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
                {pet.status && (
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                      pet.status === "adotado" ? "bg-blue-500" : "bg-green-500"
                    }`}
                  >
                    {pet.status.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {pet.name}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  {pet.species} • {pet.age || "Idade N/A"}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(pet)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100 transition"
                  >
                    <CgPen /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition"
                  >
                    <CgTrash /> Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
