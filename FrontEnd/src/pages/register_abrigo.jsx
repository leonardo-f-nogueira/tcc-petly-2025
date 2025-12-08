// Página de cadastro para abrigos

import Header from "../components/header/headerPrincipal.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { CgGoogle } from "react-icons/cg";
import { useState } from "react";
import api from '../services/api';

export default function RegisterAbrigo() {
  const [tipo, setTipo] = useState("Abrigo");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
   
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

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
    if (!username || !username.trim()) newErrors.username = "Nome da ONG obrigatório";
    if (!email) newErrors.email = "Email obrigatório";
    if (!cnpj) newErrors.cnpj = "CNPJ obrigatório";
    if (!address || !address.trim()) newErrors.address = "Endereço obrigatório";
    if (!phone) newErrors.phone = "Telefone obrigatório";
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
      const cnpjLimpo = cnpj.replace(/\D/g, '');
      
      await api.post('/auth/abrigo/cadastro', {
        name: username,
        email: email,
        password: password,
        cnpj: cnpjLimpo,
        address: address,
        phone: phone,
      });
      
      alert("Cadastro realizado com sucesso! Aguarde a aprovação da nossa equipe.");
      navigate("/login/abrigo");

    } catch (error) {
      console.error("Erro no cadastro de abrigo:", error);
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
              Cadastre sua ONG de forma correta.
            </p>
          </section>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleTipoChange("Adotante")}
              className={`
                px-6 py-3 border
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
              type="button"
              onClick={() => handleTipoChange("Abrigo")}
              className={`
                px-6 py-3 border
                ${
                  tipo === "Abrigo"
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-black border-[#000000] border-2"
                }
              `}
            >
              Abrigo
            </button>
          </div>

          <section className="flex flex-col gap-6 items-center w-full">
            <div className="w-full md:w-[500px]">
              <label className="text-xs text-gray-500">Nome da ONG</label>
              <input
                type="text"
                placeholder="Nome da ONG"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">{errors.username}</p>
              )}
            </div>

            <div className="w-full md:w-[500px]">
              <label className="text-xs text-gray-500">CNPJ (somente números)</label>
              <input
                type="text"
                placeholder="CNPJ"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                maxLength={14}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.cnpj && (
                <p className="text-sm text-red-600 mt-1">{errors.cnpj}</p>
              )}
            </div>

            <div className="w-full md:w-[500px]">
              <label className="text-xs text-gray-500">Email</label>
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
              <label className="text-xs text-gray-500">Endereço Completo</label>
              <input
                type="text"
                placeholder="Endereço"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.address && (
                <p className="text-sm text-red-600 mt-1">{errors.address}</p>
              )}
            </div>

            <div className="w-full md:w-[500px]">
              <label className="text-xs text-gray-500">Telefone de Contato</label>
              <input
                type="text"
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
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
              <label className="text-xs text-gray-500">Confirme sua senha</label>
              <input
                type="password"
                placeholder="Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-300 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
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
    </main>
  );
}
