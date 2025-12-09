// Página administrativa para gerenciamento de cadastros de ONGs, permitindo ao admin ver, aprovar ou recusar solicitações pendentes.
import { useState, useEffect } from "react";
import { CgCheckR, CgClose, CgSpinner, CgFileDocument } from "react-icons/cg";
import AdminSidebar from "../components/header/adminSideBar.jsx";
import api from "../services/api";
import SucessoModal from "../components/modals/sucessoModal.jsx";

export default function AdmOng() {
  const [ongsPendentes, setOngsPendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [showQuestionario, setShowQuestionario] = useState(false);
  const [questionarioData, setQuestionarioData] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmCallback, setConfirmCallback] = useState(null);

  useEffect(() => {
    async function fetchOngsPendentes() {
      try {
        setLoading(true);
        const response = await api.get("/admin/ongs-pendentes");
        setOngsPendentes(response.data);
      } catch (err) {
        console.error("Erro ao buscar ONGs pendentes:", err);
        setError("Não foi possível carregar a lista de ONGs.");
      } finally {
        setLoading(false);
      }
    }

    fetchOngsPendentes();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const actionText = newStatus === "Aprovado" ? "aprovar" : "rejeitar";

    setConfirmMessage(`Tem certeza que deseja ${actionText} esta ONG?`);
    setShowConfirm(true);

    setConfirmCallback(() => async () => {
      try {
        setProcessingId(id);
        await api.patch(`/admin/ongs/${id}/status`, { status: newStatus });
        setOngsPendentes((prev) => prev.filter((ong) => ong.id !== id));
        setModalMessage(`ONG ${newStatus.toLowerCase()} com sucesso!`);
        setShowModal(true);
      } catch (err) {
        console.error(`Erro ao ${actionText} ONG:`, err);
        alert(`Erro ao ${actionText} a ONG. Tente novamente.`);
      } finally {
        setProcessingId(null);
      }
    });
    return;
  };

  const handleViewQuestionario = (data) => {
    setQuestionarioData(data);
    setShowQuestionario(true);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50">
        <div className="p-10 w-full">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Aprovação de ONGs
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 gap-4">
              <CgSpinner size={40} className="animate-spin text-blue-600" />
              <p>Carregando solicitações...</p>
            </div>
          ) : error ? (
            <div className="text-center p-8 text-red-600 bg-red-50 rounded-xl">
              <p>{error}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {ongsPendentes.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-xl text-gray-500">
                    Nenhuma ONG pendente de aprovação.
                  </p>
                </div>
              ) : (
                ongsPendentes.map((ong) => (
                  <div
                    key={ong.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden"
                  >
                    {processingId === ong.id && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                        <CgSpinner
                          size={30}
                          className="animate-spin text-blue-600"
                        />
                      </div>
                    )}

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-800">
                          {ong.name}
                        </h3>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                          Pendente
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>CNPJ:</strong> {ong.cnpj || "Não informado"}
                        </p>
                        <p>
                          <strong>E-mail:</strong> {ong.email}
                        </p>
                        <p>
                          <strong>Telefone:</strong>{" "}
                          {ong.phone || "Não informado"}
                        </p>
                        <p className="text-xs text-gray-400">
                          Solicitado em:{" "}
                          {new Date(ong.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      {ong.questionnaireData && (
                        <button
                          onClick={() =>
                            handleViewQuestionario(ong.questionnaireData)
                          }
                          disabled={processingId === ong.id}
                          className="px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition flex items-center justify-center gap-2"
                        >
                          <CgFileDocument size={20} /> Ver Questionário
                        </button>
                      )}

                      <button
                        onClick={() => handleUpdateStatus(ong.id, "Aprovado")}
                        disabled={processingId === ong.id}
                        className="px-4 py-3 bg-green-100 text-green-700 rounded-xl font-bold hover:bg-green-200 transition flex items-center justify-center gap-2"
                      >
                        <CgCheckR size={20} /> Aprovar
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(ong.id, "Rejeitado")}
                        disabled={processingId === ong.id}
                        className="px-4 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition flex items-center justify-center gap-2"
                      >
                        <CgClose size={20} /> Rejeitar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <SucessoModal
            open={showModal}
            onClose={() => setShowModal(false)}
            message={modalMessage}
          />

          {showQuestionario && questionarioData && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
                <button
                  onClick={() => setShowQuestionario(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                  <CgClose size={24} />
                </button>
                <h3 className="text-2xl font-bold mb-6">
                  Respostas do Questionário
                </h3>
                <div className="space-y-4">
                  {Object.entries(questionarioData).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-4">
                      <p className="font-bold text-gray-700 mb-1">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        :
                      </p>
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {value.toString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setShowQuestionario(false)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {showConfirm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white w-[300px] p-6 rounded-xl shadow-xl text-center animate-fade-in">
                <h2 className="text-xl font-bold text-red-600">Confirmação</h2>
                <p className="mt-2 text-gray-700">{confirmMessage}</p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-bold"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={() => {
                      setShowConfirm(false);
                      if (confirmCallback) confirmCallback();
                    }}
                    className="flex-1 cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-bold"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
