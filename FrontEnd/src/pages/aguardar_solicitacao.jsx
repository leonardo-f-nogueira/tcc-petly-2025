import Footer from "../components/Footer.jsx";

export default function AguardarSolicitacao() {
  return (
    <main>
      <section className="flex min-h-screen w-full bg-[#F7F8FC]">
        <aside className="w-1/3 bg-white px-14 py-20 flex flex-col justify-between shadow-md">
          <div>
            <h1 className="text-4xl font-extrabold flex justify-center text-gray-800 mb-4">
              Solicitação enviada!
            </h1>
          </div>

          <div className="flex justify-center mt-10">
            <img
              src="illustrator/Advantages-bro.svg"
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
        <section className="flex flex-col justify-center px-20 pt-24 pb-0">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
            Nossa equipe está trabalhando para analisar sua solicitação.
          </h2>
          <p className="text-gray-700">
            Você receberá um email, informado sua{" "}
            <span className="text-green-600">aprovação</span> ou{" "}
            <span className="text-red-600">rejeição</span>
          </p>
        </section>
      </section>
      <Footer />
    </main>
  );
}