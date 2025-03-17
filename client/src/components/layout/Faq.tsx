import { useState } from "react";
import AccordionItem from "../common/AccordionItem";

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = [
    {
      title: "Question #1",
      description: "This is the first item's accordion body.",
    },
    {
      title: "Question #2",
      description: "This is the second item's accordion body.",
    },
    {
      title: "Question #3",
      description: "This is the third item's accordion body.",
    },
    {
      title: "Question #4",
      description: "This is the fourth item's accordion body.",
    },
    {
      title: "Question #5",
      description: "This is the fifth item's accordion body.",
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // Si está abierto, lo cierra; si no, lo abre
  };

  return (
    <section className="container pt-5 pb-5">
      <div>
        <h2>Frequently Asked Questions</h2>
        <p>Aquí puedes encontrar respuestas a las preguntas más comunes.</p>
      </div>
      <div className="accordion w-100">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            description={item.description}
            isOpen={activeIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Faq;
