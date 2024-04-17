require('dotenv').config();

const pluginRss = require('@11ty/eleventy-plugin-rss');
const svgSprite = require("eleventy-plugin-svg-sprite");

const filters = require('./config/filters/index.js');

module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addWatchTarget('./src/assets');

    // Pass-through files
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    eleventyConfig.addPassthroughCopy({ "./src/assets/favicon": "/" });

    // Plugins
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(svgSprite, {
        path: "./src/assets/svg",
        globalClasses: 'icon-svg',
        defaultClasses: 'icon-default',
    });

    eleventyConfig.addTemplateFormats('css');
    eleventyConfig.addPlugin(require('./config/extensions/css.js'));

    // Filters
    Object.keys(filters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, filters[filterName])
    })

    // Shortcodes
    eleventyConfig.addPlugin(require('./config/shortcodes/icon.js'));
    eleventyConfig.addPlugin(require('./config/shortcodes/image.js'));
    eleventyConfig.addPlugin(require('./config/shortcodes/currentDate.js'));

    // Transforms
    eleventyConfig.addPlugin(require('./config/transforms/htmlmin.js'));

    // Layout alias
    eleventyConfig.addLayoutAlias('base', 'base.njk');

    return {
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        pathPrefix: '/',
        dir: {
            input: "src",
            output: "dist",
            data: "data",
            includes: "_includes",
            layouts: "_layouts"
        }
    };
}
