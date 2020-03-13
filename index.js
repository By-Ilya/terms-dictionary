const {
    categories,
    countTexts,
    stopWordsMetricBoundary,
    termsMetricBoundary
} = require('./config');
const getCorpusByCategory = require('./helpers/corpusHelper');
const calculateTFIDF = require('./api/TF-IDF');
const TrieDictionary = require('./api/TrieDictionary');
const writeDictionaryToFile = require('./helpers/dictionaryHelper');

run = async () => {
    let corps = [];
    let allTexts = [];

    console.log(`Read corps in categories: ${categories.join(', ')}...`);
    for (let category of categories) {
        let currentCorpus = await getCorpusByCategory(
            category, countTexts
        );

        corps.push(currentCorpus);
        allTexts = allTexts.concat(currentCorpus);
    }

    console.log(`Creating stop words dictionary...`);
    const stopWordsDictionary = calculateMetricAndCreateDictionary(
        allTexts, stopWordsMetricBoundary
    );
    await writeDictionaryToFile(stopWordsDictionary, 'stopWords');

    for (let i = 0; i <= categories.length - 2; i++) {
        console.log(`Creating dictionary for category: ${categories[i]}...`);
        const categoryDictionary = calculateMetricAndCreateDictionary(
            corps[i], termsMetricBoundary, stopWordsDictionary
        );
        await writeDictionaryToFile(categoryDictionary, categories[i]);
    }

    console.log(`Dictionaries was created successfully!`);
    process.exit(0);
};

calculateMetricAndCreateDictionary = (
    corpus, metricBoundary, stopWordsDictionary = undefined
) => {
    const tfIdfCorpus = calculateTFIDF(corpus);
    return createDictionaryWithWords(
        tfIdfCorpus, metricBoundary, stopWordsDictionary
    );
};

createDictionaryWithWords = (
    wordMetrics, metricBoundary, stopWordsDictionary = undefined
) => {
    let dictionary = new TrieDictionary();
    wordMetrics.forEach(text => {
        text.forEach(wordObject => {
            if (wordObject.metric >= metricBoundary) {
                if (stopWordsDictionary !== undefined) {
                    if (!stopWordsDictionary.isWord(wordObject.word)) {
                        dictionary.add(wordObject.word);
                    }
                } else {
                    dictionary.add(wordObject.word);
                }
            }
        });
    });

    return dictionary;
};


run();