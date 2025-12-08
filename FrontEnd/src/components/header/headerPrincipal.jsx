import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="w-full flex justify-center px-4 py-6">
        <div
          className="
            w-full
            max-w-[1200px]
            flex 
            justify-between 
            items-center
          "
        >
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="logo" className="w-[90px] sm:w-[110px]" />
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/login/usuario">
              <button
                className="
                  flex items-center gap-2
                  border border-gray-300
                  cursor-pointer
                  rounded-[5px]
                  px-4 py-2
                  text-sm font-medium
                "
              >
                Login
              </button>
            </Link>

            <Link to="/cadastro/usuario">
              <button
                className="
                  flex items-center gap-2
                  bg-green-600
                  text-black
                  cursor-pointer
                  rounded-[5px]
                  px-4 py-2
                  text-sm font-medium
                "
              >
                Cadastre-se
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1200px] h-[1px] bg-[#D9D9D9]"></div>
      </div>
    </>
  );
}
