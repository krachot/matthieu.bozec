const pluginRss = require('@11ty/eleventy-plugin-rss');
const svgSprite = require("eleventy-plugin-svg-sprite");

const filters = require('./config/filters/index.js');

module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);

    // Asset Watch Targets
    eleventyConfig.addWatchTarget("./_tmp/style.css");

    // Pass-through files
    eleventyConfig.addPassthroughCopy({"./_tmp/style.css": "/assets/css/style.css"});
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");

    // Plugins
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(svgSprite, {
        path: "./src/assets/svg",
        globalClasses: 'icon-svg',
        defaultClasses: 'icon-default',
    });

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
