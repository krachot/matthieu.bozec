module.exports = {
    "title": "Matthieu Bozec",
    "url": (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL) ||
        "http://localhost:8080",
    "language": "fr",
    "description": "Matthieu Bozec, développeur Web Full Stack avec plus de 20 ans d''expérience. Spécialisé dans Symfony et Wordpress, basé près de Poitiers.",
    "author": {
      "name": "Matthieu Bozec",
      "email": "matthieu@4h04.com",
      "url": "https://matthieu.bozec.org/about"
    },
    "production": (process.env.CONTEXT === "production")
}
