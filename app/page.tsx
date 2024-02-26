import Container from "@/components/ui/Container";
import Title from "@/components/ui/homepage/Title";
import NavButtons from "@/components/ui/homepage/NavButtons";
import MainSection from "@/components/ui/homepage/MainSection";

export default function Home() {
  return (
    <main>
      <section>
        <Title />
      </section>
      <section>
        <NavButtons />
      </section>
      <MainSection />
    </main>
  );
}
