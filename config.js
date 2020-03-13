require('dotenv').config();

const corpusRootDirectory = process.env.CORPUS_ROOT_DIRECTORY || './corpus';
const categories = [
    process.env.CATEGORY_NAME_1 || 'automobiles',
    process.env.CATEGORY_NAME_2 || 'sport',
    process.env.CATEGORY_OTHERS || 'others'
];

const countTexts = parseInt(process.env.COUNT_TEXTS) || 36;

const stopWordsMetricBoundary = parseFloat(
    process.env.STOP_WORDS_METRIC_BOUNDARY
) || 0.0003;
const termsMetricBoundary = parseFloat(
    process.env.TERMS_METRIC_BOUNDARY
) || 0.0002;

const outputFolder = process.env.OUTPUT_DATA || './output-data';


module.exports = {
    corpusRootDirectory,
    categories,
    countTexts,
    stopWordsMetricBoundary,
    termsMetricBoundary,
    outputFolder
};