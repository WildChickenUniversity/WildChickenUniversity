const { PDFDocument, StandardFonts } = PDFLib;
const myDate = new Date();
async function fillForm(fname, lname) {
  // Fetch the PDF with form fields

  const formUrl =
    "https://raw.githubusercontent.com/Mr-Sheep/WildChickenAdmission/master/Admission/template.pdf";
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 12;
  console.log(myDate.toDateString().substring(3));
  console.log(`${fname} ${lname}`);
  // Get the form containing all the fields
  const form = pdfDoc.getForm();
  // Get all fields in the PDF by their names
  const dateField = form.getTextField("date");
  const nameField = form.getTextField("name");

  // Fill in the name field
  dateField.setText(`${myDate.toDateString().substring(4)}`);
  nameField.setText(`Dear ${fname} ${lname},`);

  dateField.updateAppearances(timesRomanFont);
  nameField.updateAppearances(timesRomanFont);

  // Flatten the form fields
  form.flatten();
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  // Trigger the browser to download the PDF document
  download(
    pdfBytes,
    `WCU_AdmissionOffer_${fname}_${lname}.pdf`,
    "application/pdf"
  );

}
