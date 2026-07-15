const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // Construct the file path
    const filePath = `file:///${path.join(__dirname, 'public', 'resume.html').replace(/\\/g, '/')}`;
    console.log('Loading:', filePath);
    
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    // Apply print media type to trigger @media print styles
    await page.emulateMediaType('print');
    
    // Generate PDF
    const pdfPath = path.join(__dirname, 'public', 'resume.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true, // Important for our background color/styles if any
      margin: { top: 0, right: 0, bottom: 0, left: 0 } // Margins are handled by our CSS
    });
    
    await browser.close();
    console.log('PDF successfully generated at:', pdfPath);
  } catch (err) {
    console.error('Error generating PDF:', err);
    process.exit(1);
  }
})();
