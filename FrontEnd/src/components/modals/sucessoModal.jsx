import { useState, useEffect } from 'react';

export default function SucessoModal({ open, onClose, message = "Feito com sucesso!" }) {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    setIsVisible(open);
  }, [open]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      <div
        className="
          fixed inset-0 bg-black z-40
          transition-opacity duration-300 ease-in-out
          animate-fadeIn
        "
        style={{
          opacity: isVisible ? 0.5 : 0,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
        onClick={handleClose}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-6">
        <div
          className="
            bg-white rounded-lg p-6 sm:p-8 max-w-[400px] w-full
            shadow-2xl
            transition-all duration-300 ease-in-out
            transform
            animate-slideUp
            relative
          "
        >
          <button
            onClick={handleClose}
            className="
              absolute top-4 right-4
              w-8 h-8 flex items-center justify-center
              bg-gray-200 hover:bg-gray-300
              rounded-full
              transition-colors duration-200
              cursor-pointer
              text-gray-600 font-bold text-xl
            "
            aria-label="Fechar"
          >
            ×
          </button>

          <div className="flex flex-col items-center gap-6 pt-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-center text-gray-800">
              {message}
            </p>

            <button
              onClick={handleClose}
              className="
                bg-green-600
                text-white
                px-8 py-2
                rounded-lg
                font-medium
                hover:bg-green-700
                transition-colors duration-200
                cursor-pointer
                w-full
              "
            >
              Ok
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.5;
          }
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
    </>
  );
}