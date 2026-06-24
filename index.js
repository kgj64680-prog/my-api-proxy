const axios = require('axios');

export default async function handler(req, res) {
  const { theaterCode, date } = req.query; // theaterCode: 0040 등, date: 20260624 등

  try {
    const response = await axios({
      method: 'post',
      url: 'https://m.cgv.co.kr/Schedule/api/getScheduleData',
      data: new URLSearchParams({ theaterCode, date }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Referer': 'https://m.cgv.co.kr/Schedule/',
        'Origin': 'https://m.cgv.co.kr'
      }
    });
    
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "CGV 서버가 거부했습니다. 다시 시도해주세요." });
  }
}
