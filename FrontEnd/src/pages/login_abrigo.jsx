// Página de login para abrigos 

import Header from "../components/header/headerPrincipal.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import api from '../services/api';
import { CgGoogle } from "react-icons/cg";
import { useState } from "react";

export default function LoginAbrigo() {
  const [tipo, setTipo] = useState("Abrigo");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setErro("");

    if (!email || !senha) {
      setErro("Email e senha são obrigatórios");
      return;
    }

    try {
      if (tipo === "Abrigo") {
        const response = await api.post('/auth/abrigo/login', { email, password: senha });
        const { token } = response.data;

        localStorage.setItem('petly_token', token);
        login("abrigo");
        navigate("/dash_abrigo");

      } else if (tipo === "Adotante") {
        navigate("/login/usuario");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErro(error.response.data.erro || "Erro ao realizar login.");
      } else if (error.request) {
        setErro("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
      } else {
        setErro("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  const handleTipoChange = (novoTipo) => {
    setTipo(novoTipo);
    setErro("");
    setEmail("");
    setSenha("");

    if (novoTipo === "Adotante") {
      navigate("/login/usuario");
    } else {
      navigate("/login/abrigo");
    }
  };

  return (
    <main>
      <Header />

      <section className="w-full flex justify-center">
        <div className="flex flex-col items-center gap-15 p-5 md:p-20 max-w-[700px]">
          <section className="flex flex-col items-center ">
            <p className="font-extrabold text-2xl m-0">
              Seja bem-vindo, {tipo}!
            </p>
            <p className="m-0 text-base md:text-lg lg:text-xl">
              Faça seu login como {tipo.toLowerCase()}.
            </p>
          </section>

          <div className="flex gap-4">
            <button
              onClick={() => handleTipoChange("Adotante")}
              className={`
                cursor-pointer px-6 py-3 border
                ${
                  tipo === "Adotante"
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-black border-gray-300"
                }
              `}
            >
              Adotante
            </button>

            <button
              onClick={() => handleTipoChange("Abrigo")}
              className={`
                cursor-pointer px-6 py-3 border
                ${
                  tipo === "Abrigo"
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-black border-gray-300"
                }
              `}
            >
              Abrigo
            </button>
          </div>

          <section className="flex flex-col gap-8 items-center">
            <div>
              <div className="flex flex-col w-full md:w-[500px]">
                <label className="text-xs font-semibold text-gray-500 mb-1">
                  Insira seu email
                </label>

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-4 border rounded-xl border-[#C5C5C5] h-[60px] text-base"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-col w-full md:w-[500px]">
                <label className="text-xs font-semibold text-gray-500 mb-1">
                  Insira sua senha
                </label>

                <input
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="p-4 border rounded-xl border-[#C5C5C5] h-[60px] text-base"
                />
              </div>
            </div>
          </section>

          {erro && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {erro}
            </div>
          )}

          <div className="flex justify-center w-full">
            <button
              onClick={handleLogin}
              className="
                bg-[#FFF75A]
                w-[300px]
                h-[40px]
                flex
                items-center
                justify-center
                transition-transform
                duration-200
                ease-out
                hover:scale-105
                active:scale-95
                rounded-[10px]
                border-1
                border-[#646464]
                font-medium
                cursor-pointer
              "
            >
              Entrar
            </button>
          </div>

          <section className="flex flex-col gap-5 items-center w-full">
            <p className="font-normal">Outras formas de login</p>

            <section className="flex w-full justify-center">
              <button
                className="
                  flex items-center justify-center gap-3
                  w-full max-w-[500px]
                  border border-gray-300
                  rounded-xl
                  py-4
                  text-gray-700 font-medium
                  hover:bg-gray-100
                  transition
                "
              >
                <CgGoogle size={22} className="text-green-700" />
                <span className="text-base">Continuar com Google</span>
              </button>
            </section>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
