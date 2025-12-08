import CliqueAqui from "../buttons/clique-ong.jsx";

export default function ONG() {
  return (
    <main>
      <section className="border border-[#CDCDCD] p-8 w-full max-w-[850px] mx-auto h-[300px]">
        <section className="flex items-center justify-between gap-10 h-full">
          <section className="flex flex-col gap-4 max-w-[400px] justify-center">
            <p className="text-2xl font-semibold">Torne-se uma ONG ou Abrigo</p>

            <p className="text-sm text-[#414141] leading-relaxed">
              ONG’S são muito bem-vindas para fazerem parte do nosso projeto.
            </p>

            <section className="mt-2">
              <CliqueAqui />
            </section>
          </section>

          <section className="flex justify-center items-center">
            <img
              src="/illustrator/college.png"
              alt="Ilustração de ONG"
              className="w-[300px] object-contain"
            />
          </section>
        </section>
      </section>
    </main>
  );
}
