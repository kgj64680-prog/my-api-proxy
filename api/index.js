const chromium = require('@sparticuz/chromium-min');
const puppeteer = require('puppeteer-core');

export default async function handler(req, res) {
  const { theaterCode, date } = req.query;
  
  try {
    const browser = await puppeteer.launch({
      args: [...chromium.args, "--no-sandbox"],
      // 이 부분을 수정했습니다: 경로를 강제로 지정합니다.
      executablePath: await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v119.0.0/chromium-v119.0.0-pack.tar'),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    
    await page.goto(`https://m.cgv.co.kr/Schedule/?theaterCode=${theaterCode}&date=${date}`, { waitUntil: 'networkidle2' });

    const result = await page.evaluate(() => {
        return document.body.innerText; 
    });

    await browser.close();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: "실행 오류: " + error.message });
  }
}
