// Tela "Solicitações Recebidas" do dashboard da ONG.
import { useState, useEffect } from "react";
import { CgSpinner, CgUserList, CgMail, CgPhone, CgGlobeAlt, CgCheckO, CgCloseO } from "react-icons/cg";
import api from "../../services/api";

export default function SolicitacoesRecebidas() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    async function fetchSolicitacoes() {
      try {
        const response = await api.get("/solicitacoes/abrigo");
        setSolicitacoes(response.data);
      } catch (err) {
        console.error("Erro ao buscar solicitações:", err);
        setError("Não foi possível carregar as solicitações no momento.");
      } finally {
        setLoading(false);
      }
    }

    fetchSolicitacoes();
  }, []);

  async function handleUpdateStatus(id, newStatus) {
    if (newStatus === 'Rejeitado' && !window.confirm("Tem certeza que deseja rejeitar esta solicitação?")) {
        return;
    }

    try {
      setProcessingId(id);
      await api.patch(`/solicitacoes/${id}/status`, { status: newStatus });
      setSolicitacoes((prevSolicitacoes) =>
        prevSolicitacoes.filter((solicitacao) => solicitacao.id !== id)
      );
      alert(`Solicitação ${newStatus.toLowerCase()} com sucesso!`);
    } catch (err) {
      console.error(`Erro ao marcar como ${newStatus}:`, err);
      alert(`Erro ao processar a solicitação. Tente novamente.`);
    } finally {
      setProcessingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 gap-4">
        <CgSpinner size={40} className="animate-spin text-green-600" />
        <p>Carregando solicitações...</p>
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
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Solicitações Recebidas</h1>
        <p className="text-gray-500">
          Veja e gerencie quem tem interesse nos seus pets ({solicitacoes.length}).
        </p>
      </header>

      {solicitacoes.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <CgUserList size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-500 mb-2">Nenhuma solicitação pendente.</p>
          <p className="text-gray-400">Assim que alguém se interessar, aparecerá aqui.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {solicitacoes.map((solicitacao) => {
            const { id, type, animal, usuario } = solicitacao;
            const badgeColor = type === 'adotar' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
            const tipoLabel = type === 'adotar' ? 'Adoção' : 'Apadrinhamento';
            const animalImageUrl = animal ? (animal.photoUrl || animal.image) : null;
            const isProcessing = processingId === id;

            return (
              <div key={id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden">
                {isProcessing && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                        <CgSpinner size={40} className="animate-spin text-green-600" />
                    </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    {animalImageUrl ? (
                      <img
                        src={animalImageUrl.startsWith("data:") ? animalImageUrl : `/${animalImageUrl}`}
                        alt={animal.name}
                        className="w-full h-full object-cover"
                         onError={(e) => { e.target.src = "/imgs/placeholder-pet.jpg" }}
                      />
                    ) : (
                        <span className="text-2xl flex items-center justify-center h-full">🐾</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{animal ? animal.name : 'Pet Removido'}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
                      Interesse em {tipoLabel}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100"></div>

                <div>
                  <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <CgUserList className="text-green-600" /> Contato do Interessado
                  </h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p className="font-medium text-lg text-gray-800">
                      {usuario ? usuario.name : 'Usuário Desconhecido'}
                    </p>
                    <div className="flex items-center gap-2">
                      <CgMail className="text-gray-400" />
                      <span>{usuario ? usuario.email : 'E-mail não disponível'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CgPhone className="text-gray-400" />
                        <span>{usuario && usuario.phone ? usuario.phone : 'Telefone não informado'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CgGlobeAlt className="text-gray-400" />
                        <span>{usuario && usuario.location ? usuario.location : 'Localização não informada'}</span>
                    </div>
                  </div>
                </div>

                 <div className="mt-auto pt-4 flex gap-3">
                    <button
                        onClick={() => handleUpdateStatus(id, 'Aprovado')}
                        disabled={isProcessing}
                        className="flex-1 py-3 bg-green-100 text-green-700 rounded-xl font-bold hover:bg-green-200 transition flex items-center justify-center gap-2"
                    >
                        <CgCheckO size={20} /> Aprovar
                    </button>
                    <button
                        onClick={() => handleUpdateStatus(id, 'Rejeitado')}
                        disabled={isProcessing}
                        className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition flex items-center justify-center gap-2"
                    >
                        <CgCloseO size={20} /> Rejeitar
                    </button>
                 </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}