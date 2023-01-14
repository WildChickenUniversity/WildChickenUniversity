const { PDFDocument, StandardFonts } = PDFLib;
const myDate = new Date();
async function fillForm(fname, lname, major) {
  // Fetch the PDF with form fields
  const formUrl = "https://cdn.jsdelivr.net/gh/WildChickenUniversity/diploma/assets/template_diploma.pdf"
  // const formUrl = "https://raw.githubusercontent.com/WildChickenUniversity/WildChickenUniversity/master/assets/template_diploma.pdf"
  const englishUnicode = /^[0-9a-zA-Z\s]+$/;
  console.log(`Is user input in pure English: ${englishUnicode.test(major)}`);
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const fontkit = window.fontkit;
  pdfDoc.registerFontkit(fontkit);
  
  // Copyright (c) 2018, Fredrick R. Brennan (<copypaste@kittens.ph>)
  // https://github.com/ctrlcctrlv/chomsky, licensed under  OFL-1.1
  const chomskyFontUrl = "https://cdn.jsdelivr.net/gh/WildChickenUniversity/diploma/assets/fonts/Chomsky.woff2";
  const chomskyFontByte = await fetch(chomskyFontUrl).then(res => res.arrayBuffer());
  const chomskyFont = await pdfDoc.embedFont(chomskyFontByte);
  
  // Google Noto Serif Simplified Chinese 900
  const sourceHanSerifUrl = "https://cdn.jsdelivr.net/gh/WildChickenUniversity/diploma/assets/fonts/noto-serif-sc-v16-chinese-simplified-900.woff2";
  const sourceHanSerifByte = await fetch(sourceHanSerifUrl).then(res => res.arrayBuffer());
  const sourceHanSerif = await pdfDoc.embedFont(sourceHanSerifByte);

  // if user input in English, then use chomskyFont.
  const font = englishUnicode.test(major) ? chomskyFont : sourceHanSerif;

  console.log(`Today is ${myDate.toDateString().substring(4)}, generating for ${fname} ${lname} with major ${major} and font ${font.name}`);
  // Get the form containing all the fields
  const form = pdfDoc.getForm();
  // Get all fields in the PDF by their names
  const majorField = form.getTextField("major");
  const nameField = form.getTextField("name");

  // Fill in the name field
  majorField.setText(major);
  nameField.setText(`${fname} ${lname}`);
  const fontSize = 31;
  majorField.updateAppearances(font);
  nameField.updateAppearances(chomskyFont);

  // Flatten the form fields
  form.flatten();
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  // Trigger the browser to download the PDF document
  download(
    pdfBytes,
    `WCU_Graduation_Certificate_${fname}_${lname}_${myDate.toDateString().substring(4).replace(/\s/g, '_')}.pdf`,
    "application/pdf"
  );

}