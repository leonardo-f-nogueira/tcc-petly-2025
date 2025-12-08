// Barra lateral do Administrador.

import { CgChevronLeftR, CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <section className="flex flex-col justify-between h-full">
      <div className="w-64 h-screen bg-white justify-between fixed left-0 top-0 overflow-y-auto transition-all shadow-xl z-50">
        
        <div className="p-8 border-10 border-inline border-green-700 bg-green-800 h-20 flex items-center">
          <h1 className="text-white text-2xl font-bold">Administrador</h1>
        </div>

        <div className="p-6 flex items-center gap-2 text-sm text-gray-600">
          <CgProfile size={20} />
          <p>Painel de Controle</p>
        </div>

        <nav className="flex flex-col gap-3 px-6 text-gray-800 font-extrabold">
          <Link
            to="/admin/ong"
            className="bg-gray-200 py-3 px-4 rounded-lg hover:bg-green-100 hover:text-green-800 hover:pl-6 transition-all cursor-pointer flex items-center justify-between"
          >
            Aprovação de ONGs
          </Link>
        </nav>

        <div className="mt-auto p-6">
            <nav className="flex gap-3 text-gray-800 font-medium">
            <Link
                to="/"
                className="h-12 w-12 flex items-center justify-center rounded-full hover:bg-red-700 transition-all cursor-pointer bg-red-600 text-white shadow-md"
                title="Sair"
            >
                <CgChevronLeftR size={22} />
            </Link>
            </nav>
        </div>
      </div>
    </section>
  );
}