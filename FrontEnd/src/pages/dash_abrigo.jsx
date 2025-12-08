//Dashboard Principal da ONG.

import { useState } from "react";
import SideBar from "../components/dash/SideBar.jsx";
import Edit from "../components/dash/cadastro.jsx";
import List from "../components/dash/lista.jsx";
import SolicitacoesRecebidas from "../components/dash/solicitacoes_recebidas.jsx";
import PerfilAbrigo from "../components/dash/perfil_abrigo.jsx";

export default function DashAbrigo() {
  const [activeView, setActiveView] = useState("meus-pets");
  const [sidebarImage, setSidebarImage] = useState(null);
  const [petToEdit, setPetToEdit] = useState(null);

  const handleProfileUpdate = (newPhotoUrl) => {
    setSidebarImage(newPhotoUrl);
  };

  const renderContent = () => {
    switch (activeView) {
      case "meus-pets":
        return (
          <List setActiveView={setActiveView} setPetToEdit={setPetToEdit} />
        );

      case "cadastrar":
        return <Edit petToEdit={petToEdit} setActiveView={setActiveView} />;

      case "solicitacoes":
        return <SolicitacoesRecebidas />;

      case "perfil":
        return <PerfilAbrigo onUpdateProfile={handleProfileUpdate} />;

      default:
        return (
          <List setActiveView={setActiveView} setPetToEdit={setPetToEdit} />
        );
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#F7F8FC] flex flex-col">
      <div className="flex flex-1 relative">
        <div className="sticky top-0 h-full z-20">
          <SideBar
            activeView={activeView}
            onChangeView={setActiveView}
            forceImage={sidebarImage}
          />
        </div>

        <section className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          <div className="bg-white rounded-3xl shadow-sm min-h-full p-8 border border-gray-100">
            {renderContent()}
          </div>
        </section>
      </div>
    </main>
  );
}
