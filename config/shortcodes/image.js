const Image = require("@11ty/eleventy-img");

async function imageShortcode(
    src,
    alt,
    sizes = '100 vw',
    className = '',
    loading = 'lazy',
    decoding = 'async'
) {
    const metadata = await Image(src, {
        widths: [150, 300, 600, 900, 1200],
        formats: ["webp"],
        outputDir: "./dist/img/",
    });

    const imageAttributes = {
        alt,
        sizes,
        loading,
        decoding,
        class: className
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: "inline"
    });
}

module.exports = eleventyConfig => {
    eleventyConfig.addAsyncShortcode("image", imageShortcode);
}
