// Página de cadastro para usuários adotantes

import Header from "../components/header/headerPrincipal.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { CgGoogle } from "react-icons/cg";
import { useState } from "react";
import api from "../services/api";

export default function RegisterUsuario() {
  const [tipo, setTipo] = useState("Adotante");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const handleTipoChange = (novoTipo) => {
    setTipo(novoTipo);
    if (novoTipo === "Adotante") {
      navigate("/cadastro/usuario");
    } else {
      navigate("/cadastro/abrigo");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!username || !username.trim()) newErrors.username = "Nome obrigatório";
    if (!cpf) newErrors.cpf = "CPF obrigatório";
    if (!phone) newErrors.phone = "Telefone obrigatório";
    if (!email) newErrors.email = "Email obrigatório";
    if (!password || password.length < 6)
      newErrors.password = "Senha deve ter ao menos 6 caracteres";
    if (confirmPassword !== password)
      newErrors.confirmPassword = "As senhas não coincidem";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setApiError("");
    if (!validate()) return;

    try {
      const cpfLimpo = cpf.replace(/\D/g, "");

      await api.post("/auth/usuario/cadastro", {
        name: username,
        email: email,
        password: password,
        cpf: cpfLimpo,
        phone: phone,
        location: "Não informado",
      });

      setShowAlert(true);

    } catch (error) {
      console.error("Erro no cadastro:", error);
      if (error.response) {
        setApiError(error.response.data.erro || "Erro ao realizar cadastro.");
      } else {
        setApiError("Erro de conexão com o servidor. Tente novamente.");
      }
    }
  };

  return (
    <main>
      <Header />

      <section className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-15 p-5 md:p-20 max-w-[700px]"
        >
          <section className="flex flex-col items-center ">
            <p className="font-extrabold text-2xl m-0">Selecione uma opção</p>
            <p className="m-0 text-base md:text-lg lg:text-base">
              Cadastre-se de forma correta.
            </p>
          </section>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleTipoChange("Adotante")}
              className={`
                cursor-pointer px-6 py-3 border
                ${
                  tipo === "Adotante"
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-black border-[#000000] border-2"
                }
              `}
            >
              Adotante
            </button>

            <button
              type="button"
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

          <section className="flex flex-col gap-6 items-center w-full">
            <div className="w-full md:w-[500px]">
              <label className="text-xs text-gray-500">
                Insira o seu nome completo
              </label>
              <input
                type="text"
                placeholder="Nome Completo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">{errors.username}</p>
              )}
            </div>

            <div className="w-full md:w-[500px]">
              <label className="text-xs text-gray-500">
                Insira seu CPF (somente números)
              </label>
              <input
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                maxLength={11}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.cpf && (
                <p className="text-sm text-red-600 mt-1">{errors.cpf}</p>
              )}
            </div>

            <div className="w-full md:w-[500px]">
              <label className="text-xs text-gray-500">
                Insira seu telefone (com DDD)
              </label>
              <input
                type="text"
                placeholder="(XX) 9XXXX-XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="w-full md:w-[500px]">
              <label className="text-xs text-gray-500">Insira seu email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="w-full md:w-[500px]">
              <label className="text-xs text-gray-500">Insira sua senha</label>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="w-full md:w-[500px]">
              <label className="text-xs text-gray-500">
                Confirme sua senha
              </label>
              <input
                type="password"
                placeholder="Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </section>

          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full md:w-[500px]">
              {apiError}
            </div>
          )}

          <div className="flex justify-center w-full mt-4">
            <button
              type="submit"
              className="bg-[#FFF75A] w-[300px] h-[40px] flex items-center justify-center transition-transform duration-200 ease-out hover:scale-105 active:scale-95 rounded-[10px] border-1 border-[#646464] font-medium cursor-pointer"
            >
              Cadastrar
            </button>
          </div>

          <section className="flex flex-col gap-5 items-center w-full mt-6">
            <p className="font-normal">Outras formas de login</p>

            <section className="flex w-full justify-center">
              <button
                type="button"
                className="flex items-center justify-center gap-3 w-full max-w-[500px] border border-gray-300 rounded-xl py-4 text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                <CgGoogle size={22} className="text-green-700" />
                <span className="text-base">Continuar com Google</span>
              </button>
            </section>
          </section>
        </form>
      </section>

      <Footer />

      {showAlert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[320px] p-6 rounded-xl shadow-xl text-center animate-fade-in">
            <h2 className="text-xl font-bold text-green-600">
              Cadastro realizado!
            </h2>
            <p className="mt-2 text-gray-700">
              Estamos felizes em ter você conosco! 
            </p>

            <button
              onClick={() => {
                setShowAlert(false);
                navigate("/login/usuario");
              }}
              className="mt-4 cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
