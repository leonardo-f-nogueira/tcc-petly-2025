import Footer from "../components/Footer.jsx";

export default function SolicitacaoEnviada() {
  return (
    <main>
      <section className="w-full min-h-screen flex items-center justify-center bg-[#F7F8FC]">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md text-center">
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Solicitação Enviada!
          </h1>

          <p className="text-gray-600 mb-8">
            Sua solicitação foi enviada com sucesso. Entraremos em contato em breve para confirmar os detalhes.
          </p>

          <button
            onClick={() => window.location.href = "/"}
            className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition"
          >
            Voltar para Home
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}