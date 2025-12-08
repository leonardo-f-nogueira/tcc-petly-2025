// Exibe a lista de solicitações de adoção/apadrinhamento de animasi

import { useEffect, useState } from "react";
import {
  CgChevronDownR,
  CgChevronUpR,
  CgCheckR,
  CgClose,
} from "react-icons/cg";
import { getSolicitations, removeSolicitation, getPets, updateSolicitation } from "../../lib/storage.js";
import SucessoModal from "../modals/sucessoModal.jsx";

export default function Solicitacoes() {
  const [solicitations, setSolicitations] = useState([]);
  const [pets, setPets] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const load = () => {
    setSolicitations(getSolicitations());
    setPets(getPets());
  };

  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener("solicitationsUpdated", handler);
    window.addEventListener("petsUpdated", handler);
    return () => {
      window.removeEventListener("solicitationsUpdated", handler);
      window.removeEventListener("petsUpdated", handler);
    };
  }, []);

  const handleAccept = (id) => {
    removeSolicitation(id);
    setModalMessage("Solicitação aceita com sucesso!");
    setShowModal(true);
  };

  const handleCancel = (id) => {
    removeSolicitation(id);
    setModalMessage("Solicitação cancelada.");
    setShowModal(true);
  };

  const handleEdit = (solicitation) => {
    setEditingId(solicitation.id);
    setEditData({ ...solicitation });
  };

  const handleSaveEdit = (id) => {
    updateSolicitation(id, editData);
    setEditingId(null);
    setEditData({});
    setModalMessage("Solicitação atualizada com sucesso!");
    setShowModal(true);
  };

  return (
    <main className="flex flex-col gap-5 w-full">
      {solicitations.length === 0 ? (
        <p className="text-gray-500 mt-4 text-base">
          Nenhuma solicitação no momento.
        </p>
      ) : (
        solicitations.map((s) => (
          <div key={s.id} className="rounded-[20px] max-w-[700px] p-5 bg-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-7">
                <section className="bg-gray-300 rounded-full w-15 h-15 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {s.petId && pets.find(p => p.id === s.petId) ? (
                    <img
                      src={pets.find(p => p.id === s.petId)?.image}
                      alt="pet"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">🐾</span>
                  )}
                </section>
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    Solicitação #{s.id}
                  </p>
                  <p className="text-sm text-gray-500 font-bold uppercase">
                    {s.type === 'apadrinhar' ? 'APADRINHOU' : s.type === 'adotar' ? 'ADOTOU' : s.type}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                className="text-xl text-black font-medium hover:underline"
              >
                {expandedId === s.id ? <CgChevronUpR /> : <CgChevronDownR />}
              </button>
            </div>

            {expandedId === s.id && (
              <div className="my-4 pt-4 border-t border-gray-100 space-y-2">
                {editingId === s.id ? (
                  <div className="space-y-2">
                    {s.nome !== undefined && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Nome:</label>
                        <input
                          type="text"
                          value={editData.nome || ""}
                          onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </div>
                    )}
                    {s.telefone !== undefined && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Telefone:</label>
                        <input
                          type="text"
                          value={editData.telefone || ""}
                          onChange={(e) => setEditData({ ...editData, telefone: e.target.value })}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </div>
                    )}
                    {s.mensagem !== undefined && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Mensagem:</label>
                        <textarea
                          value={editData.mensagem || ""}
                          onChange={(e) => setEditData({ ...editData, mensagem: e.target.value })}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                          rows="2"
                        />
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleSaveEdit(s.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      >
                        <CgCheckR className="inline mr-1" /> Salvar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {s.nome && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Nome:</span>{" "}
                        {s.nome}
                      </p>
                    )}

                    {s.telefone && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Telefone:</span>{" "}
                        {s.telefone}
                      </p>
                    )}

                    {s.mensagem && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Mensagem:</span>{" "}
                        {s.mensagem}
                      </p>
                    )}

                    <div className="flex flex-col gap-3 pt-3">
                      <p className="text-normal font-medium">Enviar solicitação </p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleAccept(s.id)}
                          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                        >
                          <CgCheckR />
                        </button>

                        <button
                          onClick={() => handleCancel(s.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                          <CgClose />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))
      )}

      <SucessoModal
        open={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
      />
    </main>
  );
}
