// Componente da barra lateral do painel de controle.
import { useState, useEffect } from "react";
import {
  CgList,
  CgFileAdd,
  CgNotes,
  CgArrowLeftR,
  CgProfile,
} from "react-icons/cg";
import { Link } from "react-router-dom";

export default function SideBar({ activeView, onChangeView, forceImage }) {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (forceImage) {
      setProfileImage(forceImage);
    }
  }, [forceImage]);

  const menus = [
    { id: "solicitacoes", icon: <CgNotes size={24} />, label: "Solicitações" },
    { id: "meus-pets", icon: <CgList size={24} />, label: "Meus Pets" },
    { id: "cadastrar", icon: <CgFileAdd size={24} />, label: "Cadastrar Pet" },
    { id: "perfil", icon: <CgProfile size={24} />, label: "Perfil" },
  ];

  return (
    <aside className="w-24 bg-black text-white flex flex-col items-center py-8 gap-10 h-full relative shadow-xl z-10">
      <div
        onClick={() => onChangeView("perfil")}
        className="w-14 h-14 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-md overflow-hidden border-2 border-transparent hover:border-green-500 transition-all group"
        title="Editar Perfil"
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="perfil"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-800 text-xl group-hover:text-green-600">
            🏠
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 w-full items-center">
        {menus.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            title={item.label}
            className={`
              w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-200 group relative
              ${
                activeView === item.id
                  ? "bg-green-600 text-white shadow-lg shadow-green-900/30 scale-105"
                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }
            `}
          >
            {item.icon}
            <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto mb-4">
        <Link to="/" title="Sair do Painel">
          <button className="w-14 h-14 rounded-xl bg-red-600 hover:bg-red-700 transition cursor-pointer flex items-center justify-center shadow-md">
            <CgArrowLeftR size={24} className="text-white" />
          </button>
        </Link>
      </div>
    </aside>
  );
}
