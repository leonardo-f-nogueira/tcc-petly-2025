import CliqueAqui from "../buttons/clique-adodante.jsx";

export default function Adotante() {
  return (
    <main>
      <section className="border border-[#CDCDCD] p-8 w-full max-w-[850px] mx-auto h-[300px]">
        <section className="flex items-center justify-between gap-10 h-full">
          <section className="flex flex-col gap-4 max-w-[600px] justify-center">
            <p className="text-2xl font-semibold">Apadrinhe ou Adote</p>

            <p className="text-sm text-[#414141] leading-relaxed">
              Com a petly, você pode colaborar ou adotar, fique à vontade.
            </p>

            <section className="mt-2">
              <CliqueAqui />
            </section>
          </section>

          <section className="flex justify-center items-center">
            <img
              src="/illustrator/DogWalking.png"
              alt="Pessoa passeando com cachorro"
              className="w-[300px] object-cover"
            />
          </section>
        </section>
      </section>
    </main>
  );
}
