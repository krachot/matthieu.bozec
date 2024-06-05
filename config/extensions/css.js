import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';

export default (eleventyConfig) => {
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
};
