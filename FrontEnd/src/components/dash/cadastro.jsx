import { useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import api from "../../services/api";

export default function Edit({ petToEdit, setActiveView }) {
  const isEditing = !!petToEdit;
  const [loading, setLoading] = useState(false);

  const initialImage = petToEdit?.photoUrl || null;
  const [imagePreview, setImagePreview] = useState(initialImage);

  const [formData, setFormData] = useState({
    name: petToEdit?.name || "",
    species: petToEdit?.species || "",
    breed: petToEdit?.breed || "",
    age: petToEdit?.age || "",
    size: petToEdit?.size || "Médio",
    gender: petToEdit?.gender || "Macho",
    description: petToEdit?.description || "",
    photoUrl: petToEdit?.photoUrl || "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => {});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.species || !formData.photoUrl) {
      setAlertMessage(
        "Por favor, preencha os campos obrigatórios e adicione uma foto."
      );
      setOnConfirm(() => () => setShowAlert(false));
      setShowAlert(true);
      return;
    }

    try {
      setLoading(true);

      if (isEditing) {
        await api.put(`/animais/${petToEdit.id}`, formData);
        setAlertMessage("Pet atualizado com sucesso!");
      } else {
        await api.post("/animais", formData);
        setAlertMessage("Pet cadastrado com sucesso!");
      }

      setOnConfirm(() => () => setActiveView("meus-pets"));
      setShowAlert(true);
    } catch (error) {
      let msg = "Erro ao salvar o pet. Tente novamente.";
      if (error.response?.data?.erro) msg = error.response.data.erro;

      setAlertMessage(msg);
      setOnConfirm(() => () => setShowAlert(false));
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <section className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditing ? `Editar ${petToEdit.name}` : "Cadastrar Novo Pet"}
        </h1>
        <p className="text-gray-500">Preencha as informações do animalzinho.</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6"
      >
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-48 h-48 bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-4xl">📷</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <p className="text-sm text-gray-500">
            Clique na imagem para selecionar uma foto (Obrigatório)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl"
              placeholder="Nome do pet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Espécie *
            </label>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl"
              placeholder="Cão, Gato, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Raça
            </label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
              placeholder="Sem raça definida (SRD)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Idade (Ex: 2 anos) *
            </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl"
              placeholder="Idade aproximada"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Porte *
            </label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white"
            >
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gênero *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white"
            >
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição e História
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-xl"
            placeholder="Conte um pouco sobre o pet..."
          ></textarea>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => setActiveView("meus-pets")}
            className="flex-1 cursor-pointer py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 cursor-pointer py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <CgSpinner className="animate-spin text-xl" />
            ) : isEditing ? (
              "Salvar Alterações"
            ) : (
              "Cadastrar Pet"
            )}
          </button>
        </div>
      </form>

      {showAlert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[300px] px-6 py-6 rounded-xl shadow-xl text-center animate-fade-in">
            <h2
              className={`text-xl font-bold ${
                alertMessage.includes("Erro") ||
                alertMessage.includes("preencha") ||
                alertMessage.includes("erro") ||
                alertMessage.includes("não")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {alertMessage.includes("Erro") ||
              alertMessage.includes("preencha") ||
              alertMessage.includes("erro") ||
              alertMessage.includes("não")
                ? "Atenção!"
                : "Ação concluída!"}
            </h2>

            <p className="mt-2 text-gray-700">{alertMessage}</p>

            <button
              onClick={() => {
                setShowAlert(false);
                onConfirm();
              }}
              className={`mt-4 cursor-pointer px-4 py-2 rounded-lg w-full transition ${
                alertMessage.includes("Erro") ||
                alertMessage.includes("preencha") ||
                alertMessage.includes("erro") ||
                alertMessage.includes("não")
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
