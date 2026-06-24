const chromium = require('@sparticuz/chromium-min');
const puppeteer = require('puppeteer-core');

export default async function handler(req, res) {
  const { theaterCode, date } = req.query;
  
  try {
    // 가상의 브라우저 실행
    const browser = await puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    // CGV 모바일 페이지 접속 (사람처럼 보이게 함)
    await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1");
    
    await page.goto(`https://m.cgv.co.kr/Schedule/?theaterCode=${theaterCode}&date=${date}`, { waitUntil: 'networkidle2' });

    // 시간표 데이터를 긁어오기
    const data = await page.evaluate(() => {
      // 여기에 CGV 페이지에서 시간표가 담긴 HTML 태그를 추출하는 자바스크립트 로직
      return document.body.innerText; 
    });

    await browser.close();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
