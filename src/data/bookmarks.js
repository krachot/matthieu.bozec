const EleventyFetch = require('@11ty/eleventy-fetch');

const API_KEY = process.env.POCKET_CONSUMER_KEY;
const API_URL = 'https://getpocket.com/v3/get';
const API_ACCESS_TOKEN = process.env.POCKET_ACCESS_TOKEN;

module.exports = async () => {
    try {
      const json = await EleventyFetch(`${API_URL}`, {
          duration: '1h',
          type: 'json',
          fetchOptions: {
            method: "POST",
            body: JSON.stringify({
              consumer_key: API_KEY,
              access_token: API_ACCESS_TOKEN,
              favorite: 1,
              sort: 'newest'
            }),
            headers: {
                "Content-Type": "application/json",
            }
          }
        }
      );

      const normalizedData = Object.entries(json.list).map(([_, item]) => {
        return {
            "url": item.resolved_url,
            "title": item.resolved_title,
            "excerpt": item.excerpt,
            "language": item.lang,
            "created_at": Number(item.time_added) * 1000
          };
      });

      return normalizedData.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)

    } catch (ex) {
      return [];
    }
  };
