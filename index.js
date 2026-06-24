const axios = require('axios');
const cheerio = require('cheerio'); // HTML을 쉽게 긁어오는 도구입니다.

export default async function handler(req, res) {
  const { query } = req.query; // 예: "CGV 울산삼산 상영시간표"
  const url = `https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const scheduleList = [];

    // 네이버 영화 시간표 박스를 찾아 정보를 긁어옵니다 (클래스명은 실제 페이지 구조에 맞춰 조정)
    $('.movie_list_box .item').each((i, el) => {
      scheduleList.push({
        movieTitle: $(el).find('.movie_name').text().trim(),
        hallInfo: $(el).find('.hall_name').text().trim(),
        startTime: $(el).find('.time').text().trim(),
      });
    });

    res.status(200).json(scheduleList);
  } catch (error) {
    res.status(500).json({ error: "데이터 파싱 실패: " + error.message });
  }
}
