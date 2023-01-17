const { PDFDocument, StandardFonts } = PDFLib;
const myDate = new Date();
async function fillForm(fname, lname, admitted, graduate) {
  // Fetch the PDF with form fields
  let formUrl;
  let status = graduate ? "Graduate" : "Undergraduae";
  let decision = admitted ? "Accept" : "Decline";
  if (graduate) {
    formUrl = admitted ?
      "https://cdn.jsdelivr.net/gh/WildChickenUniversity/WildChickenUniversity/assets/admission/template_master.pdf" : "https://cdn.jsdelivr.net/gh/WildChickenUniversity/WildChickenUniversity/assets/admission/template_master_reject.pdf";
  } else {
    formUrl = admitted ?
      "https://cdn.jsdelivr.net/gh/WildChickenUniversity/WildChickenUniversity/assets/admission/template.pdf" : "https://cdn.jsdelivr.net/gh/WildChickenUniversity/WildChickenUniversity/assets/admission/template_reject.pdf";      
  }
  console.log(`template url: ${formUrl}`)

  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 12;
  console.log(`Date: ${myDate.toDateString().substring(4)}. Name: ${fname} ${lname}. Is graduate: ${graduate}, Is admitted: ${admitted}`);
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
    `WCU_Admission_Decision_${decision}_${status}_${fname}_${lname}_${myDate.toDateString().substring(4).replace(/\s/g, '_')}.pdf`,
    "application/pdf"
  );

}