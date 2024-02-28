import Image from "next/image";
import { MainSection } from "@/lib/definitions";

export default function MainSection() {
  const data: MainSection[] = [
    {
      title: "AI Powered",
      description:
        "Unlock a world of limitless communication possibilities with our AI-driven chat app. Our cutting-edge technology effortlessly translates chat messages into your chosen language, ensuring every conversation is clear and inclusive, regardless of language differences. Connect with anyone, anywhere, and experience the power of seamless cross-language communication today!",
      image: "/img/logo5.png",
    },
    {
      title: "Chat Connections",
      description:
        "Discover the art of meaningful conversations and the magic of forming connections. Our app transcends language barriers, empowering you to chat, make friends, and nurture relationships with ease. Dive into a world of limitless possibilities where communication knows no boundaries. Join the conversation and experience the power of connection today!",
      image: "/img/women-logo.png",
    },
  ];
  return (
    <>
      {data.map((el, index) => (
        <Section
          key={el.title}
          index={index}
          title={el.title}
          description={el.description}
          image={el.image}
        />
      ))}
    </>
  );
}

const Section = ({
  index,
  title,
  description,
  image,
}: {
  index: number;
  title: string;
  description: string;
  image: string;
}) => {
  const flexClassName = `h-screen flex flex-col md:flex-row ${
    index % 2 === 0 ? "md:flex-row-reverse" : ""
  } justify-center items-center gap-20`;

  return (
    <section className={flexClassName}>
      <div className="flex flex-col items-center text-center md:block md:text-start">
        <div className="w-14 md:w-28 h-[1px] bg-red-500"></div>
        <h2 className="text-2xl md:text-3xl my-4">{title}</h2>
        <p className="text-md md:text-xl md:text-start">{description}</p>
      </div>
      <Image
        src={image}
        alt="ai-logo"
        width={500}
        height={400}
        className="hidden lg:block"
      />
      <Image
        src={image}
        alt="ai-logo"
        width={300}
        height={200}
        className="block lg:hidden"
      />
    </section>
  );
};
