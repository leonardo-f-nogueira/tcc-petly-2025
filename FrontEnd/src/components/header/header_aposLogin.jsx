import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth.js";
import { CgLogOut } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function HeaderLogin() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleConfirmLogout = () => {
    logout();
    setShowModal(false);
    navigate("/");
  };

  return (
    <header className="w-full flex flex-col items-center mt-10 px-4">
      <div
        className="
          w-full 
          max-w-[1200px] 
          flex 
          justify-between 
          items-center
        "
      >
        <img src="/logo2.png" alt="logo" className="w-[90px] sm:w-[100px]" />

        <section className="flex gap-3">
          <section>
            <Link to={"/cadastro/abrigo"}>
              <button
                className="
                bg-white text-black
                cursor-pointer
                border border-gray-300
                px-6 py-2 rounded-full
                font-medium
                hover:bg-gray-100
                transition-all
              "
              >
                <span className="font-semibold">
                  Desejo me cadastrar como ONG
                </span>
              </button>
            </Link>
          </section>

          <button
            onClick={() => setShowModal(true)}
            className="
            flex items-center gap-2
            border border-gray-300
            rounded-full
            cursor-pointer
            px-4 py-2
            text-sm font-medium
            bg-white
           hover:bg-gray-100
            transition-all
          "
          >
            <CgLogOut size={18} />
            Logout
          </button>
        </section>
      </div>

      <div className="w-full max-w-[1200px] h-[1px] bg-[#D9D9D9] mt-10"></div>

      {showModal && (
        <>
          <div
            className="
              fixed inset-0 z-40
              transition-opacity duration-300 ease-in-out
              animate-fadeIn
              bg-white
            "
            style={{ opacity: 0.6 }}
            onClick={() => setShowModal(false)}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-6">
            <div
              className="
                bg-white rounded-2xl p-6 sm:p-8 
                max-w-[400px] w-full shadow-2xl
                animate-slideUp
              "
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                Tem certeza que deseja sair da sua conta?
              </h2>

              <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
                Você será desconectado e redirecionado para a página inicial.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => setShowModal(false)}
                  className="
                    bg-gray-400 text-white
                    px-6 py-2 rounded-lg
                    font-medium
                    text-sm sm:text-base
                    hover:bg-gray-500
                    transition-all
                    flex-1 sm:flex-initial
                  "
                >
                  Não
                </button>

                <button
                  onClick={handleConfirmLogout}
                  className="
                    bg-[#CA2020] text-white
                    px-6 py-2 rounded-lg
                    font-medium
                    text-sm sm:text-base
                    hover:opacity-85
                    transition-all
                    flex-1 sm:flex-initial
                  "
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 0.6; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-in-out;
        }
      `}</style>
    </header>
  );
}
