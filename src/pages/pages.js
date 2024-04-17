require('dotenv').config();

const isDevEnv = process.env.ELEVENTY_ENV === 'development';

function showDraft(data) {
	const isDraft = 'draft' in data && data.draft !== false;
	return isDevEnv || !isDraft;
}

module.exports = {
    "tag": ["page"],
    eleventyComputed: {
        eleventyExcludeFromCollections: function(data) {
            if(showDraft(data)) {
                return data.eleventyExcludeFromCollections;
            }
            else {
                return true;
            }
        },
        permalink: function(data) {
            if(showDraft(data)) {
                return data.permalink
            }
            else {
                return false;
            }
        }
	},
}
