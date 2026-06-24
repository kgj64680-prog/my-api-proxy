const axios = require('axios');

export default async function handler(req, res) {
  const { date } = req.query; // 예: 20260624
  const apiKey = 'dd2156824e31608e79408f1d3646e44a'; 

  try {
    // KOBIS API로 박스오피스 데이터를 가져옵니다 (영화 리스트 확보)
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${date}`;
    const response = await axios.get(url);
    
    // 가져온 영화 리스트를 그대로 전달
    res.status(200).json(response.data.boxOfficeResult.dailyBoxOfficeList);
  } catch (error) {
    res.status(500).json({ error: "API 요청 실패: " + error.message });
  }
}
