import {
  CgGlobe,
  CgClose,
  CgFacebook,
  CgInstagram,
  CgUserList,
} from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-400 bg-white py-6 ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
          <span>&copy; 2025 Petly. Todos os direitos reservados.</span>

          <span className="hidden md:block">·</span>
          <button className="hover:underline">Privacidade</button>

          <span className="hidden md:block">·</span>
          <button className="hover:underline">Termos</button>

          <span className="hidden md:block">·</span>
          <button className="hover:underline">Informações da empresa</button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-800">
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            <CgGlobe size={18} />
            <span>Português (BR)</span>
          </div>

          <CgFacebook size={20} className="cursor-pointer hover:opacity-70" />
          <CgClose size={20} className="cursor-pointer hover:opacity-70" />
          <CgInstagram size={20} className="cursor-pointer hover:opacity-70" />

          <Link
            to="/admin/ong"
            title="Administrador"
            className="flex items-center justify-center 
             w-8 h-8 rounded-full bg-gray-200 
             hover:bg-gray-300 transition mr-3"
          >
            <CgUserList size={18} className="text-gray-700 cursor-pointer" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
