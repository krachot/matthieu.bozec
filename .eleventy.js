module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);

    // Asset Watch Targets
    eleventyConfig.addWatchTarget("./_tmp/style.css");

    // Pass-through files
    eleventyConfig.addPassthroughCopy({"./_tmp/style.css": "/assets/css/style.css"});
    eleventyConfig.addPassthroughCopy({"src/robots.txt": "/robots.txt"});

    // Shortcodes
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