import { useState } from "react";
import AccordionItem from "../common/AccordionItem";
import { useTranslation } from "react-i18next";

export const Faq = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = [
    {
      title: t("faq.questions.q1"),
      description: t("faq.answers.a1"),
    },
    {
      title: t("faq.questions.q2"),
      description: t("faq.answers.a2"),
    },
    {
      title: t("faq.questions.q3"),
      description: t("faq.answers.a3"),
    },
    {
      title: t("faq.questions.q4"),
      description: t("faq.answers.a4"),
    },
    {
      title: t("faq.questions.q5"),
      description: t("faq.answers.a5"),
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // Si está abierto, lo cierra; si no, lo abre
  };

  return (
    <section className="container pt-5 pb-5">
      <div>
        <h2>{t("faq.title")}</h2>
        <p>{t("faq.description")}</p>
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
