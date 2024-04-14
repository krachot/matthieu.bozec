const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnanoPlugin = require("cssnano");

module.exports = eleventyConfig => {
    eleventyConfig.addExtension('css', {
        outputFileExtension: 'css',
        compile: async (content, path) => {
            return async () => {
                let output = await postcss([
                    autoprefixer,
                    cssnanoPlugin,
                ]).process(content, {
                    from: path,
                });

                return output.css;
            }
        }
    });
}
