const { PDFDocument, StandardFonts } = PDFLib;
const myDate = new Date();
async function fillForm(fname, lname, admitted) {
  // Fetch the PDF with form fields
  console.log(admitted)
  const formUrl = admitted ?
    "https://cdn.jsdelivr.net/gh/WildChickenUniversity/WildChickenUniversity/assets/template.pdf" : "https://cdn.jsdelivr.net/gh/WildChickenUniversity/WildChickenUniversity/assets/template_reject.pdf";
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 12;
  console.log(myDate.toDateString().substring(4));
  console.log(`${fname} ${lname} admitted: ${admitted}`);
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
    `WCU_Admission_Decision_${fname}_${lname}_${myDate.toDateString().substring(4)}.pdf`,
    "application/pdf"
  );

}
