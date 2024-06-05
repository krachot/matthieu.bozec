import { DateTime } from 'luxon';

export default eleventyConfig => {
    eleventyConfig.addShortcode('currentDate', (date = DateTime.now()) => {
        return date;
    });
}
