const SENTENCE_SPLIT_REGEX = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=[.?])(\s|[A-Z].*)/g;

sentenceTokenizer = (text) => {
    const sentences = text.split(SENTENCE_SPLIT_REGEX);
    if (sentences) {
        return sentences
            .map(sentence => sentence.trim())
            .filter(sentence => sentence.toString() !== '');
    }

    return '';
};


module.exports = sentenceTokenizer;