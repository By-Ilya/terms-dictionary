require('dotenv').config();

const corpusRootDirectory = process.env.CORPUS_ROOT_DIRECTORY || './corpus';
const categories = [
    process.env.CATEGORY_NAME_1 || 'automobiles',
    process.env.CATEGORY_NAME_2 || 'sport',
    process.env.CATEGORY_OTHERS || 'others'
];

const stopWordsPercent = parseFloat(
    process.env.STOP_WORDS_PERCENT
) || 0.05;
const termsPercent = parseFloat(
    process.env.TERMS_PERCENT
) || 0.2;

const outputFolder = process.env.OUTPUT_DATA || './output-data';


module.exports = {
    corpusRootDirectory,
    categories,
    stopWordsPercent,
    termsPercent,
    outputFolder
};