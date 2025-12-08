import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';

export default function CliqueONG() {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  const handleClick = () => {
    if (!isLogged) {
      navigate('/login/abrigo');
    } else {
      navigate('/dashboard-abrigo');
    }
  };

  return (
    <section className="w-[300px]">
      <button
        onClick={handleClick}
        className="
          bg-[#FFFD5C]
          w-full
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
          text-black
          cursor-pointer
        "
      >
        Clique aqui
      </button>
    </section>
  );
}
