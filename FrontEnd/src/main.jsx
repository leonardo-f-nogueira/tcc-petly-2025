// Arquivo principal que configura as rotas do React

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import PaginaPrincipal from "./pages/pagina_principal.jsx";
import LoginUsuario from "./pages/login_usuario.jsx";
import LoginAbrigo from "./pages/login_abrigo.jsx";
import RegisterUsuario from "./pages/register_usuario.jsx";
import RegisterAbrigo from "./pages/register_abrigo.jsx";
import Perguntas from "./pages/perguntas.jsx";
import AguardarSolicitacao from "./pages/aguardar_solicitacao.jsx";
import AdministradorPerfil from "./pages/administrador_perfil.jsx";
import DetailsAnimal from "./pages/details_animal_user.jsx";
import UserPrincipal from "./pages/user_principal.jsx";
import DashAbrigo from "./pages/dash_abrigo.jsx";
import SolicitacaoEnviada from "./pages/solicitacao_enviada.jsx";
import AdmOng from "./pages/adm_ong.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/login/usuario" element={<LoginUsuario />} />
          <Route path="/login/abrigo" element={<LoginAbrigo />} />
          <Route path="/cadastro/usuario" element={<RegisterUsuario />} />
          <Route path="/cadastro/abrigo" element={<RegisterAbrigo />} />
          <Route path="/perguntas" element={<Perguntas />} />
          <Route
            path="/aguardar_solicitacao"
            element={<AguardarSolicitacao />}
          />
          <Route path="/admin/:tipo" element={<AdministradorPerfil />} />
          <Route path="/adm_ong" element={<AdmOng />} />
          <Route path="/detalhes/:id" element={<DetailsAnimal />} />
          <Route path="/user_principal" element={<UserPrincipal />} />
          <Route path="/dash_abrigo" element={<DashAbrigo />} />
          <Route path="/solicitacao_enviada" element={<SolicitacaoEnviada />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
