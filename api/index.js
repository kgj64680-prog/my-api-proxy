const axios = require('axios');

export default async function handler(req, res) {
  const { theaterCode, date } = req.query;

  try {
    const response = await axios.post('https://m.cgv.co.kr/Schedule/api/getScheduleData', 
      new URLSearchParams({ theaterCode, date }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Referer': `https://m.cgv.co.kr/Schedule/?theaterCode=${theaterCode}&date=${date}`,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    );
    
    res.status(200).json(response.data);
  } catch (error) {
    // 에러를 자세히 보기 위해 error.message를 출력합니다
    res.status(500).json({ error: error.message });
  }
}
