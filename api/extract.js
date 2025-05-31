// api/extract.js
import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    const text = await page.evaluate(() => document.body.innerText);
    await browser.close();

    const summary = summarize(text);
    const keyPoints = summary.split('.').filter(p => p.trim().length > 0);

    res.status(200).json({ summary, keyPoints });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract content.' });
  }
}

function summarize(text) {
  const sentences = text.split('.').map(s => s.trim()).filter(Boolean);
  return sentences.slice(0, 5).join('. ') + '.';
}
