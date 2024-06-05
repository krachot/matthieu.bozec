const isDevEnv = process.env.NODE_ENV !== 'production';

function showDraft(data) {
	const isDraft = 'draft' in data && data.draft !== false;

	return isDevEnv || !isDraft;
}

export default {
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
