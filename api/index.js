const chromium = require('@sparticuz/chromium-min');
const puppeteer = require('puppeteer-core');

export default async function handler(req, res) {
  const { theaterCode, date } = req.query;
  
  try {
    const browser = await puppeteer.launch({
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    
    // CGV 페이지 접속
    await page.goto(`https://m.cgv.co.kr/Schedule/?theaterCode=${theaterCode}&date=${date}`, { waitUntil: 'networkidle2' });

    // 데이터 추출
    const data = await page.evaluate(() => {
        return document.body.innerText; 
    });

    await browser.close();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: "브라우저 실행 오류: " + error.message });
  }
}
