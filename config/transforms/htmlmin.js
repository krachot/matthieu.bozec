const htmlmin = require("html-minifier");
const isProduction = process.env.ELEVENTY_ENV === 'production';

module.exports = eleventyConfig => {
    eleventyConfig.addTransform("htmlmin", function(content) {
        if (
            isProduction &&
            this.page.outputPath &&
            this.page.outputPath.endsWith(".html")
        ) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
        }

        return content;
    });
}
