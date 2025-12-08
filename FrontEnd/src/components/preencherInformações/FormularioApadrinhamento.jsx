// Componente de formulário para apadrinhamento.
import { CgArrowRightO } from "react-icons/cg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth.js";
import api from "../../services/api.js";

export default function PreenchaAdodante({ onProssiga, petId }) {
  const navigate = useNavigate();
  const { isLogged } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    contribuicao: "",
    suporte: "",
    frequencia: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isLogged) {
      navigate("/login_usuario");
      return;
    }

    if (!formData.contribuicao || !formData.suporte || !formData.frequencia) {
      alert("Por favor, preencha todos os campos antes de prosseguir.");
      return;
    }

    async function enviarSolicitacao() {
      try {
        setLoading(true);

        const payload = {
          petId: petId,
          tipo: "apadrinhar",
          tipoSuporte: formData.suporte,
          valorContribuicao: formData.contribuicao,
          frequencia: formData.frequencia,
        };

        await api.post("/solicitacoes", payload);

        onProssiga();
      } catch (error) {
        console.error("Erro ao enviar solicitação:", error);
        let mensagemErro =
          "Ocorreu um erro ao tentar enviar sua solicitação. Tente novamente.";
        if (error.response && error.response.data && error.response.data.erro) {
          mensagemErro = error.response.data.erro;
        }
        alert(mensagemErro);
      } finally {
        setLoading(false);
      }
    }

    enviarSolicitacao();
  };

  return (
    <main>
      <section className="p-8 sm:p-10 md:p-12 border-2 rounded-2xl border-gray-300 bg-white">
        <section className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-16">
          <section className="flex flex-col w-full lg:max-w-[480px]">
            <p className="font-bold text-2xl sm:text-3xl mb-10">
              Preencha suas informações
            </p>

            <section className="flex flex-col mb-8">
              <label className="text-sm font-medium mb-2">
                Qual será sua contribuição mensal?
              </label>
              <div className="relative w-full">
                <select
                  value={formData.contribuicao}
                  onChange={(e) => handleChange("contribuicao", e.target.value)}
                  className="p-3 sm:p-4 border border-[#B2B2B2] rounded-xl h-12 sm:h-14 w-full appearance-none text-base bg-white"
                >
                  <option value="" disabled hidden>
                    Selecione um valor
                  </option>
                  <option value="30.00">R$30,00</option>
                  <option value="60.00">R$60,00</option>
                  <option value="120.00">R$120,00</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </span>
              </div>
            </section>

            <section className="flex flex-col mb-8">
              <label className="text-sm font-medium mb-2">Nível de suporte</label>
              <div className="relative w-full">
                <select
                  value={formData.suporte}
                  onChange={(e) => handleChange("suporte", e.target.value)}
                  className="p-3 sm:p-4 border border-[#B2B2B2] rounded-xl h-12 sm:h-14 w-full appearance-none text-base bg-white"
                >
                  <option value="" disabled hidden>
                    Selecione o tipo
                  </option>
                  <option value="saude">Saúde</option>
                  <option value="alimentacao">Alimentação</option>
                  <option value="acessorios">Acessórios</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </span>
              </div>
            </section>

            <section className="flex flex-col">
              <label className="text-sm font-medium mb-2">Frequência</label>
              <div className="relative w-full">
                <select
                  value={formData.frequencia}
                  onChange={(e) => handleChange("frequencia", e.target.value)}
                  className="p-3 sm:p-4 border border-[#B2B2B2] rounded-xl h-12 sm:h-14 w-full appearance-none text-base bg-white"
                >
                  <option value="" disabled hidden>
                    Selecione a frequência
                  </option>
                  <option value="mensal">Mensal</option>
                  <option value="trimestral">Trimestral</option>
                  <option value="unica">Única vez</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </span>
              </div>
            </section>
          </section>

          <section className="flex flex-col items-center justify-between h-full pt-4">
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
              className={`mt-6 w-14 h-14 bg-[#FFF96A] cursor-pointer border-1 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 
              ${
                !isLogged || loading
                  ? "opacity-50 cursor-not-allowed hover:scale-100"
                  : "cursor-pointer"
              }
              `}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
              ) : (
                <CgArrowRightO className="text-3xl text-black" />
              )}
            </button>
          </section>
        </section>
      </section>
    </main>
  );
}
