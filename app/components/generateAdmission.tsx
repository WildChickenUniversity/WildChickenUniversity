import { PDFDocument, StandardFonts, PDFFont } from "pdf-lib";
// sorry guys, im just tooo stupid to use react-pdf
import content from "./content.json";

type AdmissionProps = {
  username: string;
  admitted: boolean;
  graduate: boolean;
};

interface AdmissionParagraphs {
  "admitted-undergraduate": { [key: string]: string };
  "admitted-graduate": { [key: string]: string };
  "rejected-undergraduate": { [key: string]: string };
  "rejected-graduate": { [key: string]: string };
  footer: {
    closing: string;
    signature: string;
    printed: string;
    title: string;
  };
}

// slightly modified solution from https://github.com/Hopding/pdf-lib/issues/20
const fillParagraph = (
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string => {
  const paragraphs = text.split("\n");
  const newParagraphs = [];

  for (let index = 0; index < paragraphs.length; index++) {
    const paragraph = paragraphs[index];
    if (font.widthOfTextAtSize(paragraph, fontSize) > maxWidth) {
      const words = paragraph.split(" ");
      const newParagraph: string[][] = [];
      let i = 0;
      newParagraph[i] = [];
      for (let k = 0; k < words.length; k++) {
        const word = words[k];
        newParagraph[i].push(word);
        if (
          font.widthOfTextAtSize(newParagraph[i].join(" "), fontSize) > maxWidth
        ) {
          newParagraph[i].splice(-1, 1); // Remove the last word
          i++;
          newParagraph[i] = [];
          newParagraph[i].push(word);
        }
      }
      newParagraphs.push(newParagraph.map((p) => p.join(" ")).join("\n"));
    }
  }
  return newParagraphs.join("\n\n");
};

const downloadPDF = (pdfBytes: any, fileName: string) => {
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

async function createAdmissionPDF({
  username,
  admitted,
  graduate,
}: AdmissionProps) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a page to the document
  const page = pdfDoc.addPage();
  page.setSize(612.0, 792.0);

  // Add some text to the page
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 12;
  const lineHeight = 15;
  const maxWidth = 550;
  let yOffset = 630;

  const admissionType = admitted
    ? graduate
      ? "admitted-graduate"
      : "admitted-undergraduate"
    : graduate
    ? "rejected-graduate"
    : "rejected-undergraduate";
  const admissionParagraphs = content[admissionType] as {
    [key: string]: string;
  };

  const combinedText = Object.keys(admissionParagraphs)
    .map((admissionType) => admissionParagraphs[admissionType])
    .join("\n");

  const filledText = fillParagraph(combinedText, timesRomanFont, 12, 500);

  const lines = filledText.split("\n");

  const bannerImageBytes = await fetch("/Wild_Chicken.png").then((res) =>
    res.arrayBuffer()
  );
  const signatureBytes = await fetch("/harland_sanders_signature.png").then(
    (res) => res.arrayBuffer()
  );
  const bannerImage = await pdfDoc.embedPng(new Uint8Array(bannerImageBytes));
  const signatureImage = await pdfDoc.embedPng(new Uint8Array(signatureBytes));

  // original banner size: 1170 * 4170
  page.drawImage(bannerImage, {
    x: 50,
    y: 680,
    width: 208.5,
    height: 58.5,
  });

  page.drawText(`Dear ${username},`, {
    x: 50,
    y: 660,
    size: fontSize,
    font: timesRomanFont,
    maxWidth: maxWidth,
  });
  lines.forEach((line) => {
    page.drawText(line, {
      x: 50,
      y: yOffset,
      size: fontSize,
      font: timesRomanFont,
      maxWidth: maxWidth,
    });
    yOffset -= lineHeight; // Move down for the next line
  });

  const footer = content["footer"];
  page.drawText(`${footer.closing}`, {
    x: 50,
    y: 300,
    size: fontSize,
    font: timesRomanFont,
  });

  // 381 * 1643
  page.drawImage(signatureImage, {
    x: 50,
    y: 260,
    width: 164.3,
    height: 38.1,
  });

  page.drawText(`${footer.printed}\n${footer.title}`, {
    x: 50,
    y: 250,
    size: fontSize,
    font: timesRomanFont,
  });

  const pdfBytes = await pdfDoc.save();

  downloadPDF(pdfBytes, `WCU_Admission_Decision_${username}.pdf`);
}

export default createAdmissionPDF;
