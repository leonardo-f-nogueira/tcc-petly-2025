import Soli from "../solicitações/solicitações.jsx";

export default function SCard() {
  return (
    <main className="w-full flex justify-start mt-10">
      <section className="flex flex-col w-full">
        <section className="flex flex-col gap-4">
          <Soli />
        </section>
      </section>
    </main>
  );
}