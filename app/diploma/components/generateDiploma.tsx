import BlobStream from "blob-stream";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
import SVGtoPDF from "svg-to-pdfkit";
import {
  drawChineseTextCentered,
  getChineseFontAlias,
  resolveChineseText,
} from "@/app/diploma/components/fontUtils";
import {
  fetchSrc,
  getDate,
  getYear,
  isEnglish,
  downloadPDF,
} from "@/lib/utils";

type DiplomaProps = {
  username: string;
  major: string;
  degree: string;
  withHonors: boolean;
};

const generateDiploma = async ({
  username,
  major,
  degree,
  withHonors,
}: DiplomaProps) => {
  // LETTER (612.00 X 792.00)
  const doc = new PDFDocument({ size: "LETTER", layout: "landscape" });
  const stream = doc.pipe(BlobStream());

  // Set background color
  doc.rect(0, 0, 792, 612).fill("#FEFDEB");

  // Reset fill color for text
  doc.fillColor("black");

  const logo = await fetchSrc("/images/Wild_Chicken.svg").then((res) =>
    res.text(),
  );
  const signatures = await fetchSrc("/images/signatures.svg").then((res) =>
    res.text(),
  );
  const seal = await fetchSrc("/images/seal.svg").then((res) => res.text());

  SVGtoPDF(doc, logo, 306, 0, { width: 180, height: 94.5 });
  doc.moveDown();

  const fontChomsky = await fetchSrc("/fonts/Chomsky.woff2").then((res) =>
    res.arrayBuffer(),
  );

  doc.registerFont("chomsky", fontChomsky);

  doc.fontSize(12);
  const chineseInput = [username, major, degree]
    .filter((input) => !isEnglish(input))
    .join("");
  const chineseFonts = chineseInput
    ? await resolveChineseText(chineseInput, fetchSrc)
    : [];
  const chineseFontAliases = new Map<string, string>();

  for (const { file, font } of chineseFonts) {
    const alias = getChineseFontAlias(file);
    doc.registerFont(alias, font);
    chineseFontAliases.set(file, alias);
  }

  doc.font("Times-Roman").text("BY AUTHORITY OF THE BOARD OF TRUSTEES OF THE", {
    align: "center",
  });
  doc.moveDown(0.5);

  doc.fontSize(50);
  doc.font("chomsky").text("Wild Chicken University", {
    align: "center",
  });
  doc.fontSize(12);
  doc.moveDown(0.5);

  doc.font("Times-Roman").text("ON THE NOMINATION OF THE FACULTY OF THE", {
    align: "center",
  });
  doc.font("Times-Roman").text("WILD CHICKEN UNIVERSITY", {
    align: "center",
  });
  doc.moveDown(0.5);

  doc.fontSize(30);
  if (isEnglish(username)) {
    doc.font("chomsky").text(username, {
      align: "center",
    });
  } else {
    drawChineseTextCentered(doc, username, chineseFontAliases, "chomsky");
  }
  doc.fontSize(12);
  doc.moveDown(0.2);

  doc.font("Times-Roman").text("HAS BEEN ADMITTED TO THE DEGREE OF", {
    align: "center",
  });
  doc.moveDown(0.5);

  doc.fontSize(30);
  if (isEnglish(degree)) {
    doc.font("chomsky").text(degree, {
      align: "center",
    });
  } else {
    drawChineseTextCentered(doc, degree, chineseFontAliases, "chomsky");
  }
  doc.fontSize(12);
  doc.moveDown(0.2);

  doc.font("Times-Roman").text("ON", {
    align: "center",
  });
  doc.moveDown(0.2);

  doc.fontSize(30);
  if (isEnglish(major)) {
    doc.font("chomsky").text(major, {
      align: "center",
    });
  } else {
    drawChineseTextCentered(doc, major, chineseFontAliases, "chomsky");
  }
  doc.moveDown(0.2);

  doc.fontSize(18);
  if (withHonors) {
    doc.font("chomsky").text("with High Honors", {
      align: "center",
    });
    doc.moveDown(0.2);
  }

  doc.fontSize(12);

  doc
    .font("Times-Roman")
    .text("AND IS ENTITLED TO ALL RIGHTS AND HONORS THERETO APPERTAINING", {
      align: "center",
    });
  doc.moveDown(0.5);

  doc.font("Times-Roman").text(`THIS ${getDate()} IN THE YEAR`, {
    align: "center",
  });
  doc.moveDown(0.5);
  doc.font("Times-Roman").text(`${getYear()}`, {
    align: "center",
  });

  SVGtoPDF(doc, signatures, 0, 470, { width: 792, height: 122 });

  SVGtoPDF(doc, seal, 356, 490, { width: 80, height: 80 });

  doc.end();
  stream.on("finish", () => {
    const blob = stream.toBlob("application/pdf");
    downloadPDF(blob, `WCU_Diploma_${username.split(" ").join("_")}.pdf`);
  });
};

export default generateDiploma;
