const axios = require('axios');

export default async function handler(req, res) {
  const { query } = req.query;
  const url = `https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    res.status(200).json({ message: "네이버 접속 성공!", length: response.data.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
