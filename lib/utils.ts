import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ToWords } from "to-words";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchSrc = async (src: string) => {
  const res = await fetch(src);
  if (!res.ok) {
    throw new Error(`Failed to load: ${src}`);
  }
  return res;
};

// dumb way to check if the input is latin only
export const isEnglish = (input: string) => {
  const englishUnicode = /^[0-9a-zA-Z\s]+$/;
  return englishUnicode.test(input);
};

// getting the fancy version for date
export const getDate = () => {
  const toWords = new ToWords({ localeCode: "en-US" });
  const today = new Date();

  const month = today.toLocaleString("default", { month: "long" });
  const day = toWords.toOrdinal(today.getDate());

  return `${day} Day of ${month}`.toUpperCase();
};

export const getYear = () => {
  const toWords = new ToWords({ localeCode: "en-US" });
  const today = new Date();
  const year = toWords.convert(today.getFullYear());
  return `${year}`.toUpperCase();
};

export const downloadPDF = (blob: Blob, filename: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
