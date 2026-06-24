import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "검색어를 입력하세요." });
  }
  
  try {
    const url = `https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    
    const $ = cheerio.load(data);
    res.status(200).json({ success: true, message: "접속 및 파싱 준비 완료" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
