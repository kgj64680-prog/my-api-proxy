const chromium = require('@sparticuz/chromium-min');
const puppeteer = require('puppeteer-core');

export default async function handler(req, res) {
  const { theaterCode, date } = req.query;
  
  try {
    const browser = await puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    
    // CGV 페이지 접속
    await page.goto(`https://m.cgv.co.kr/Schedule/?theaterCode=${theaterCode}&date=${date}`, { waitUntil: 'networkidle2' });

    // 시간표 데이터 영역 추출 (태그 분석)
    const result = await page.evaluate(() => {
        // CGV 모바일 페이지의 시간표 정보가 담긴 클래스 등을 가져옵니다
        return document.querySelector('body').innerText; 
    });

    await browser.close();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
