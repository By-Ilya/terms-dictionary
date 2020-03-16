const natural = require('natural');
const { lemmatizer } = require('lemmatizer');

const { corpusRootDirectory } = require('../config');
const {
    isFileExists,
    readDataFromFile,
} = require('./filesHelper');

const tokenizer = new natural.WordTokenizer();

getCorpusByCategoryName = async (categoryName, countTexts) => {
    let corpus = [];

    for (let i = 0; i < countTexts; i++) {
        const pathToFile = `${corpusRootDirectory}/${categoryName}/${i + 1}.txt`;
        if (await isFileExists(pathToFile)) {
            const text = await readDataFromFile(pathToFile);
            corpus.push(getLemmasListFromText(text));
        }
    }

    return corpus;
};

getLemmasListFromText = (text) => {
    const wordsList = tokenizer.tokenize(text);

    return wordsList.map(word => {
        return lemmatizer(word);
    });
};


module.exports = getCorpusByCategoryName;