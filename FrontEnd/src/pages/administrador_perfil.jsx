import { useParams } from "react-router-dom";
import AdmOng from './adm_ong.jsx';

export default function AdministradorPerfil() {
  const { tipo } = useParams();

  return (
    <>
      {tipo === 'ong' && <AdmOng />}
    </>
  );
}