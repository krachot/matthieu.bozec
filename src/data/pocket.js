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
            body: JSON.stringify({consumer_key: API_KEY, access_token: API_ACCESS_TOKEN, tag: "link"}),
            headers: {
                "Content-Type": "application/json",
            }
          }
        }
      );

      return Object.entries(json.list).map(([_, item]) => {
        return {
            "url": item.given_url,
            "title": item.given_title
          };
      });
      
    } catch (ex) {
      return [];
    }
  };