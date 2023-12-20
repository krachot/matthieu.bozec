module.exports = eleventyConfig => {
    eleventyConfig.addShortcode("icon", function (name) {
        return `<svg aria-hidden="true"><use xlink:href="#svg-${name}"></use></svg>`;
    });
}
