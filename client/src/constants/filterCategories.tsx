import { useTranslation } from 'react-i18next';

export const filterCategories = () => {
  const { t } = useTranslation();

  return [
    {
      id: "capacity",
      title: t("filterCategories.capacity"),
      options: [
        { id: "1-4", label: t("filterCategories.options.seats1_4") },
        { id: "5-6", label: t("filterCategories.options.seats5_6") },
        { id: "7+", label: t("filterCategories.options.seats7plus") },
      ],
    },
    {
      id: "transmission",
      title: t("filterCategories.transmission"),
      options: [
        { id: "manual", label: t("filterCategories.options.manual") },
        { id: "automatic", label: t("filterCategories.options.automatic") },
      ],
    },
    {
      id: "traction",
      title: t("filterCategories.traction"),
      options: [
        { id: "4wd", label: t("filterCategories.options.traction4wd") },
        { id: "2wd", label: t("filterCategories.options.traction2wd") },
      ],
    },
  ];
};
