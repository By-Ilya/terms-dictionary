const WORD_SPLIT_REGEX = /[^\s.,–\-:;"‘`«»()!?]+/g;

wordTokenizer = (text) => {
    const words = text.match(WORD_SPLIT_REGEX);
    if (words) {
        return words
            .map(word => word.trim())
            .filter(word => word.toString() !== '')
            .map(word => word.toLowerCase());
    }

    return '';
};


module.exports = wordTokenizer;