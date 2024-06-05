import dotenv from 'dotenv'
dotenv.config();

import fs from 'fs';
import pluginRss from '@11ty/eleventy-plugin-rss';
import svgSprite from 'eleventy-plugin-svg-sprite';
import EleventyPluginOgImage from 'eleventy-plugin-og-image';
import filters from './config/filters/index.js';
import currentDate from './config/shortcodes/currentDate.js';
import icon from './config/shortcodes/icon.js';
import image from './config/shortcodes/image.js';
import cssTransform from './config/extensions/css.js';
import htmlmin from './config/transforms/htmlmin.js';

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export default function (eleventyConfig) {
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
    eleventyConfig.addPlugin(cssTransform);

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
    eleventyConfig.addPlugin(icon);
    eleventyConfig.addPlugin(image);
    eleventyConfig.addPlugin(currentDate);

    // Transforms
    eleventyConfig.addPlugin(htmlmin);

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
