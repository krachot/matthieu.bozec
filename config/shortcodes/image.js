const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes, loading = 'lazy', decoding = 'async') {
    const metadata = await Image(src, {
        widths: [150, 300, 600],
        formats: ["webp", "jpeg"],
        outputDir: "./dist/img/",
    });

    const imageAttributes = {
        alt,
        sizes,
        loading,
        decoding,
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: "inline"
    });
}

module.exports = eleventyConfig => {
    eleventyConfig.addAsyncShortcode("image", imageShortcode);
}
