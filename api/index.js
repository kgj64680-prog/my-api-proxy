const axios = require('axios');

export default async function handler(req, res) {
  const { theaterCode, date } = req.query;
  
  // 외부 무료 브라우저 렌더링 서비스(Browserless)를 활용합니다.
  const browserlessUrl = 'https://chrome.browserless.io/content?token=YOUR_TOKEN_HERE';

  try {
    const response = await axios.post(browserlessUrl, {
      url: `https://m.cgv.co.kr/Schedule/?theaterCode=${theaterCode}&date=${date}`,
      waitForSelector: 'body'
    });
    
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: "데이터 추출 실패: " + error.message });
  }
}
