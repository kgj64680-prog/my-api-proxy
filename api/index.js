const axios = require('axios');

export default async function handler(req, res) {
  const { theaterCode, date } = req.query;

  try {
    const response = await axios.post('https://m.cgv.co.kr/Schedule/api/getScheduleData', 
      new URLSearchParams({ theaterCode, date }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        }
      }
    );
    
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "데이터를 가져오지 못했습니다." });
  }
}
