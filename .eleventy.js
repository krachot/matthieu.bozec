require('dotenv').config();

const fs = require('fs');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const svgSprite = require("eleventy-plugin-svg-sprite");
const EleventyPluginOgImage = require('eleventy-plugin-og-image');
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

    eleventyConfig.addPlugin(EleventyPluginOgImage, {
        satoriOptions: {
            width: 920,
            height: 480,
            fonts: [
                {
                    name: 'Ubuntu',
                    data: fs.readFileSync('src/assets/fonts/Ubuntu-Medium.ttf'),
                    weight: 700,
                    style: 'normal',
                },
            ],
		},
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
