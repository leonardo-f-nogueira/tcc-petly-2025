import { useState } from "react";
import { CgProfile, CgSpinner, CgCheckO, CgSoftwareUpload } from "react-icons/cg";
import api from "../../services/api";

export default function PerfilAbrigo({ onUpdateProfile }) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Estado do formulário
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    socialNetwork: "",
    photoUrl: "", // Aqui vai a string Base64 da imagem
  });

  // Estado para preview da imagem
  const [preview, setPreview] = useState(null);

  // Função para converter arquivo em Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Mostra na tela
        setFormData({ ...formData, photoUrl: reader.result }); // Prepara para enviar
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Envia apenas o que foi preenchido (filtra campos vazios)
      const dataToSend = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key]) dataToSend[key] = formData[key];
      });

      await api.put("/auth/abrigo", dataToSend);

      setSuccessMsg("Perfil atualizado com sucesso!");
      
      // Se tiver foto nova, avisa o pai (DashAbrigo) para atualizar a Sidebar
      if (dataToSend.photoUrl && onUpdateProfile) {
        onUpdateProfile(dataToSend.photoUrl);
      }

      // Limpa formulário (opcional, ou mantém os dados)
      // setFormData({ name: "", phone: "", address: "", socialNetwork: "", photoUrl: "" });
      
    } catch (err) {
      console.error(err);
      setErrorMsg("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <CgProfile className="text-green-600" /> Editar Perfil da ONG
        </h2>
        <p className="text-gray-500 mt-1">Atualize as informações que os adotantes veem.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* FOTO DE PERFIL */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-32 h-32 rounded-full border-4 border-green-100 overflow-hidden bg-gray-100 relative group">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <CgProfile size={48} />
              </div>
            )}
            
            {/* Overlay para upload */}
            <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <CgSoftwareUpload size={24} />
              <span className="text-xs font-bold mt-1">Alterar Foto</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          <p className="text-xs text-gray-400">Clique na imagem para alterar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Nome da ONG</label>
            <input
              type="text"
              name="name"
              placeholder="Digite o novo nome (opcional)"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Telefone / WhatsApp</label>
            <input
              type="text"
              name="phone"
              placeholder="(XX) 9XXXX-XXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">Endereço Completo</label>
            <input
              type="text"
              name="address"
              placeholder="Rua, Número, Bairro, Cidade - UF"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">Redes Sociais (Instagram/Facebook)</label>
            <input
              type="text"
              name="socialNetwork"
              placeholder="@seuabrigo"
              value={formData.socialNetwork}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* MENSAGENS DE FEEDBACK */}
        {successMsg && (
          <div className="p-4 bg-green-100 text-green-700 rounded-xl flex items-center gap-2 animate-bounce-in">
            <CgCheckO size={24} /> {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="p-4 bg-red-100 text-red-700 rounded-xl">
            {errorMsg}
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? <CgSpinner className="animate-spin" /> : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}