import BlobStream from "blob-stream";
import { width } from "pdfkit/js/page";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
import SVGtoPDF from "svg-to-pdfkit";
import { ToWords } from "to-words";

type DiplomaProps = {
  username: string;
  major: string;
  degree: string;
  honors: boolean;
};

const fetchSrc = async (src: string) => {
  const res = await fetch(src);
  if (!res.ok) {
    throw new Error(`Failed to load: ${src}`);
  }
  return res;
};

const isEnglish = (input: string) => {
  const englishUnicode = /^[0-9a-zA-Z\s]+$/;
  return englishUnicode.test(input);
};

const getDate = () => {
  const toWords = new ToWords({ localeCode: "en-US" });
  const today = new Date();

  const month = today.toLocaleString("default", { month: "long" });
  const day = toWords.toOrdinal(today.getDate());
  const year = toWords.convert(today.getFullYear());

  return `${day} Day of ${month}, ${year}`;
};

const generateDiploma = async ({
  username,
  major,
  degree,
  honors,
}: DiplomaProps) => {
  // LETTER (612.00 X 792.00)
  const doc = new PDFDocument({ size: "LETTER", layout: "landscape" });
  const stream = doc.pipe(BlobStream());

  const logo = await fetchSrc("/images/Wild_Chicken.svg").then((res) =>
    res.text(),
  );
  SVGtoPDF(doc, logo, 186, 0, { width: 240, height: 126 });

  const fontChomsky = await fetchSrc("/fonts/Chomsky.woff2").then((res) =>
    res.arrayBuffer(),
  );
  const fontNotoSerifSC = await fetchSrc("/fonts/NotoSerifSC-800.woff2").then(
    (res) => res.arrayBuffer(),
  );

  doc.registerFont("chomsky", fontChomsky);
  doc.registerFont("noto", fontNotoSerifSC);

  doc.font("Times-Roman").text("By authority of the Board of Trustees of the");

  doc.font("chomsky").text("Wild Chicken University");

  doc.font("Times-Roman").text("ON THE NOMINATION OF THE FACULTY OF THE");
  doc.font("Times-Roman").text("WILD CHICKEN UNIVERSITY");

  doc.font(isEnglish(username) ? "chomsky" : "noto").text(username);

  doc.font("Times-Roman").text("HAS BEEN ADMITTED TO THE DEGREE OF");

  doc.font(isEnglish(degree) ? "chomsky" : "noto").text(degree);
  doc.font(isEnglish(major) ? "chomsky" : "noto").text(major);

  if (honors) {
    doc.font("chomsky").text("with High Honors");
  }

  doc
    .font("Times-Roman")
    .text("and is entitled to all rights and honors thereto appertaining");

  doc.font("Times-Roman").text(`this ${getDate()}`);

  const seal = await fetchSrc("/images/seal.svg").then((res) => res.text());
  SVGtoPDF(doc, seal, 100, 100, { width: 100, height: 100 });

  doc.end();
  stream.on("finish", () => {
    const blob = stream.toBlob("application/pdf");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `WCU_Diploma_${username.split(" ").join("_")}.pdf`;
    link.click();
  });
};

export default generateDiploma;
