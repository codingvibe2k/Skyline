import type enDictionary from "@/dictionaries/en.json";

export type Dictionary = typeof enDictionary;

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  sw: () => import("@/dictionaries/sw.json").then((module) => module.default),
  rn: () => import("@/dictionaries/rn.json").then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const loader = dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
  return loader();
};
