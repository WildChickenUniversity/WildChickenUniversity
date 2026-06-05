import BlobStream from "blob-stream";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
import SVGtoPDF from "svg-to-pdfkit";
import { v4 as uuidv4 } from "uuid";
import { downloadPDF } from "@/lib/utils";
import content from "./content.json";

type OfferProps = {
  username: string;
  jobTitle: string;
  startDate: string;
};

async function createOfferPDF({ username, jobTitle, startDate }: OfferProps) {
  // Create a new PDF document (LETTER size: 612 x 792)
  const doc = new PDFDocument({
    size: "LETTER",
    layout: "portrait",
    pdfVersion: "1.7",
    compress: true,
    info: {
      Title: "Offer Letter",
      Author: "Wild Chicken University",
      Subject: "Offer Letter",
    },
    ownerPassword: `${uuidv4()}`,
    permissions: {
      printing: "highResolution",
      modifying: false,
      annotating: true,
      copying: true,
      contentAccessibility: true,
      documentAssembly: false,
    },
  });
  const stream = doc.pipe(BlobStream());

  const fontSize = 12;

  const OfferParagraphs = content["main"] as {
    [key: string]: string;
  };

  // Load images
  const [logo, signatures] = await Promise.all([
    fetch(`/images/Wild_Chicken.svg`).then((res) => res.text()),
    fetch(`/images/harland_sanders_signature.svg`).then((res) => res.text()),
  ]);

  // https://github.com/pdfkit/pdfkit/issues/149
  SVGtoPDF(doc, logo, 72, 40, { width: 180, height: 94.5 });

  doc.moveDown(4);

  // Add date
  doc
    .font("Times-Roman")
    .fontSize(fontSize)
    .text(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    );
  doc.moveDown(0.5);

  doc.text(`Dear ${username},`);
  doc.moveDown(0.5);
  doc.text(`Position: ${jobTitle}`);
  doc.text(
    `Start Date: ${new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`,
  );

  // main content
  doc.moveDown(0.5);
  Object.keys(OfferParagraphs).forEach((key) => {
    const paragraph = OfferParagraphs[key];
    if (paragraph) {
      doc.text(paragraph, { align: "left" });
      doc.moveDown(0.5);
    }
  });

  const footer = content["footer"];
  doc.text(footer.closing);

  // add signature image
  doc.moveDown(1);
  const signatureY = doc.y;
  SVGtoPDF(doc, signatures, 72, signatureY, { width: 200, height: 70 });

  doc.end();
  stream.on("finish", () => {
    const blob = stream.toBlob("application/pdf");
    downloadPDF(
      blob,
      `WCU_Offer_Decision_${username.split(" ").join("_")}.pdf`,
    );
  });
}

export default createOfferPDF;
