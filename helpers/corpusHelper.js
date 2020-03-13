const { corpusRootDirectory } = require('../config');
const {
    isFileExists,
    getDocumentName,
    readDataBufferFromFile,
    readDataFromFile,
    writeDataToFile,
    deleteFile
} = require('./filesHelper');
const {
    sentenceTokenizer,
    wordTokenizer
} = require('../tokenizers');

getCorpusByCategoryName = async (categoryName, countTexts) => {
    let corpus = [];

    for (let i = 0; i < countTexts; i++) {
        const pathToFile = `${corpusRootDirectory}/${categoryName}/${i + 1}.txt`;
        let textArray = [];
        if (await isFileExists(pathToFile)) {
            const text = await readDataFromFile(pathToFile);
            textArray = getTextArray(text);
        }
        corpus.push(textArray);
    }

    return corpus;
};

getTextArray = (text) => {
    let textArray = [];

    const sentences = sentenceTokenizer(text);
    if (sentences) {
        sentences.forEach(sentence => {
            const wordsList = wordTokenizer(sentence);
            if (wordsList)
                textArray = textArray.concat(wordsList);
        });
    }

    return textArray;
};


module.exports = getCorpusByCategoryName;