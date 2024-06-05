const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export default {
    "title": "Matthieu Bozec",
    "url": (process.env.NODE_ENV === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL) ||
        "http://localhost:8080",
    "language": "fr",
    "description": "Matthieu Bozec, développeur Web Full Stack avec plus de 20 ans d''expérience. Spécialisé dans Symfony et Wordpress, basé près de Poitiers.",
    "author": {
      "name": "Matthieu Bozec",
      "email": "matthieu@4h04.com",
      "url": "https://matthieu.bozec.org/about"
    },
    "production": IS_PRODUCTION
}
