// Componente de formulário para adotantes.
import { CgArrowRightO } from "react-icons/cg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth.js";
import api from "../../services/api.js";

export default function PreenchaAdotante({ onProssiga, petId }) {
  const navigate = useNavigate();
  const { isLogged } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    residencia: "",
    experiencia: "",
  });

  // ====== ESTADO DO ALERT ESTILIZADO ======
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!isLogged) {
      navigate("/login_usuario");
      return;
    }

    if (!formData.residencia || !formData.experiencia) {
      // SUBSTITUI ALERT POR MODAL ESTILIZADO
      setAlertMessage("Por favor, preencha todos os campos antes de prosseguir.");
      setShowAlert(true);
      return;
    }

    async function enviarSolicitacao() {
      try {
        setLoading(true);

        const payload = {
          petId: petId,
          tipo: "adotar",
          tipoResidencia: formData.residencia,
          experienciaComPets: formData.experiencia,
        };

        await api.post("/solicitacoes", payload);
        onProssiga();
      } catch (error) {
        console.error("Erro ao enviar solicitação de adoção:", error);

        let mensagemErro =
          "Ocorreu um erro ao tentar enviar sua solicitação. Tente novamente.";

        if (error.response && error.response.data && error.response.data.erro) {
          mensagemErro = error.response.data.erro;
        }

        // SUBSTITUI ALERT POR MODAL ESTILIZADO
        setAlertMessage(mensagemErro);
        setShowAlert(true);

      } finally {
        setLoading(false);
      }
    }

    enviarSolicitacao();
  };

  return (
    <>
    
      {showAlert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[300px] p-6 rounded-xl shadow-xl text-center animate-fade-in">
            <h2 className="text-xl font-bold text-yellow-600">Atenção</h2>

            <p className="cursor-pointer mt-3 text-gray-700">{alertMessage}</p>

            <button
              onClick={() => setShowAlert(false)}
              className="mt-6 px-6 py-2 bg-yellow-400 rounded-lg text-black font-semibold hover:bg-yellow-500 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <section className="p-8 sm:p-10 md:p-12 border-2 rounded-2xl border-gray-300 bg-white">
        <section className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
          <section className="flex flex-col w-full lg:max-w-[520px]">
            <p className="font-bold text-2xl sm:text-3xl mb-10">
              Preencha as informações
            </p>

            <section className="flex flex-col mb-8">
              <label className="text-sm font-medium mb-2">
                Tipo de residência:
              </label>

              <input
                type="text"
                placeholder="Ex: Casa c/ quintal, Apartamento c/ varanda, etc"
                value={formData.residencia}
                onChange={(e) => handleChange("residencia", e.target.value)}
                className="p-3 sm:p-4 border border-[#B2B2B2] rounded-xl text-base h-12 sm:h-14 w-full"
              />
            </section>

            <section className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-4">
                Experiência com pets:
              </label>

              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="experiencia"
                    value="iniciante"
                    onChange={(e) => handleChange("experiencia", e.target.value)}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span>Iniciante</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="experiencia"
                    value="intermediario"
                    onChange={(e) => handleChange("experiencia", e.target.value)}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span>Intermediário</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="experiencia"
                    value="avancado"
                    onChange={(e) => handleChange("experiencia", e.target.value)}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span>Avançado</span>
                </label>
              </div>
            </section>
          </section>

          <section className="flex flex-col items-center justify-between lg:justify-center gap-12 lg:gap-16 w-full">
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
              <img
                src="/illustrator/Forms-bro.png"
                alt="Imagem"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isLogged || loading}
              className={`bg-[#FFF75A] w-full h-[40px] flex items-center justify-center transition-transform duration-200 ease-out hover:scale-105 rounded-[10px] border-1 border-[#646464] font-medium ${
                !isLogged || loading
                  ? "opacity-50 cursor-not-allowed hover:scale-100"
                  : "cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
              ) : (
                "Prossiga"
              )}
            </button>
          </section>
        </section>
      </section>
    </>
  );
}
