const natural = require('natural');
const { lemmatizer } = require('lemmatizer');

const { corpusRootDirectory } = require('../config');
const {
    isFileExists,
    getFilesFromDirectory,
    readDataFromFile,
} = require('./filesHelper');

const tokenizer = new natural.WordTokenizer();

getCorpusByCategoryName = async (categoryName) => {
    let corpus = [];

    const categoryPath = `./${corpusRootDirectory}/${categoryName}`;
    const filesList = await getFilesFromDirectory(categoryPath);

    for (let fileName of filesList) {
        const pathToFile = `${categoryPath}/${fileName}`;
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