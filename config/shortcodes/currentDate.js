const { DateTime } = require("luxon");

module.exports = eleventyConfig => {
    eleventyConfig.addShortcode('currentDate', (date = DateTime.now()) => {
        return date;
    });
}
