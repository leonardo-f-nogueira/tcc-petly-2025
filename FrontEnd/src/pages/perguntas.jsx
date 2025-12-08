//[PRO FUTURO]Componente de formulário para coleta de informações adicionais do abrigo durante o cadastro.
import { CgArrowRightO } from "react-icons/cg";
import Footer from "../components/Footer.jsx";
import { useState } from "react";

export default function Perguntas() {
  const [formData, setFormData] = useState({
    responsaveis: "",
    tempoAtividade: "",
    quantidadeAnimais: "",
    vacinaFrequente: "",
    visitavel: "",
    cpfCnpj: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    console.log("Form data:", formData);
  };

  return (
    <main>
      <section className="flex min-h-screen w-full bg-[#F7F8FC]">
        <aside className="w-1/3 bg-white px-14 py-20 flex flex-col justify-between shadow-md">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              Perguntas
            </h1>
            <p className="text-gray-600 text-lg max-w-xs">
              Precisamos saber algumas informações para avançarmos com o
              cadastro.
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <img
              src="illustrator/Data report-cuate.svg"
              alt="ilustração"
              className="w-120 opacity-90"
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mt-10">
            <button className="hover:text-gray-700 transition">
              Termos de Serviço
            </button>
            <span>|</span>
            <button className="hover:text-gray-700 transition">
              Política de Privacidade
            </button>
          </div>
        </aside>

        <section className="flex-1 px-20 pt-24 pb-0">
          <p className="text-gray-500 font-medium mb-2">Preencha</p>
          <h2 className="text-4xl font-semibold text-gray-800 mb-14">
            Informações do abrigo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <div className="bg-white shadow-md rounded-xl py-8 px-6 cursor-pointer hover:shadow-xl transition-all border border-transparent hover:border-green-500">
              <p className="text-gray-800 text-lg font-medium">
                Informações Gerais
              </p>
              <p className="text-gray-500 mt-2 text-sm">
                Responsáveis, tempo de atividade e estrutura
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl py-8 px-6 cursor-pointer hover:shadow-xl transition-all border border-transparent hover:border-green-500">
              <p className="text-gray-800 text-lg font-medium">
                Informações sobre os animais
              </p>
              <p className="text-gray-500 mt-2 text-sm">
                Quantidade, vacinação e cuidados
              </p>
            </div>
          </div>

          <div className="mt-20 max-w-2xl space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="font-medium text-gray-700">
                  Quem são os responsáveis?
                </label>
                <input
                  type="text"
                  name="responsaveis"
                  value={formData.responsaveis}
                  onChange={handleChange}
                  className="block w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  Estão quanto tempo em atividade?
                </label>
                <input
                  type="text"
                  name="tempoAtividade"
                  value={formData.tempoAtividade}
                  onChange={handleChange}
                  className="block w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="font-medium text-gray-700">
                  Quantos animais estão sobre cuidado?
                </label>
                <input
                  type="text"
                  name="quantidadeAnimais"
                  value={formData.quantidadeAnimais}
                  onChange={handleChange}
                  className="block w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  Estão recebendo vacina frequentemente?
                </label>

                <div className="flex gap-8 mt-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="vacinaFrequente"
                      value="sim"
                      onChange={handleChange}
                      className="accent-green-600"
                    />
                    <span>Sim</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="vacinaFrequente"
                      value="nao"
                      onChange={handleChange}
                      className="accent-green-600"
                    />
                    <span>Não</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700">
                É possível visitar o abrigo?
              </label>
              <div className="flex gap-8 mt-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="visitavel"
                    value="sim"
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  <span>Sim</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="visitavel"
                    value="nao"
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  <span>Não</span>
                </label>
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700">
                CPF/CNPJ do responsável
              </label>
              <input
                type="text"
                name="cpfCnpj"
                value={formData.cpfCnpj}
                onChange={handleChange}
                className="block w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="mt-10 mb-10 w-14 h-14 bg-[#FFF96A] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-pointer shadow-md"
          >
            <CgArrowRightO className="text-3xl text-black" />
          </button>
        </section>
      </section>
      <Footer />
    </main>
  );
}
