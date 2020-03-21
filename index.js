const {
    categories,
    stopWordsPercent,
    termsPercent
} = require('./config');
const getCorpusByCategory = require('./helpers/corpusHelper');
const calculateTFIDF = require('./api/TF-IDF');
const TrieDictionary = require('./api/TrieDictionary');
const writeDictionaryToFile = require('./helpers/dictionaryHelper');

run = async () => {
    let corps = [];
    console.log(`Read corps in categories: ${categories.join(', ')}...`);
    for (let category of categories) {
        let currentCorpus = await getCorpusByCategory(category);
        corps.push(currentCorpus);
    }

    console.log(`Merge corps in one text for finding stop words...`);
    const allWords = mergeCorpsInOneText(corps);

    console.log(`Creating stop words dictionary...`);
    const stopWordsDictionary = calculateMetricAndCreateDictionary(
        [allWords], stopWordsPercent
    );
    await writeDictionaryToFile(stopWordsDictionary, 'stopWords');

    for (let i = 0; i <= categories.length - 2; i++) {
        console.log(`Creating dictionary for category: ${categories[i]}...`);
        const categoryDictionary = calculateMetricAndCreateDictionary(
            corps[i], termsPercent, stopWordsDictionary
        );
        await writeDictionaryToFile(categoryDictionary, categories[i]);
    }

    console.log(`Dictionaries was created successfully!`);
    process.exit(0);
};

mergeCorpsInOneText = (corps) => {
    let allWords = [];
    corps.forEach(corpus => {
        corpus.forEach(text => {
            text.forEach(lemma => {
                allWords.push(lemma);
            })
        })
    });

    return allWords;
};

calculateMetricAndCreateDictionary = (
    corpus, wordsPercent, stopWordsDictionary = undefined
) => {
    const tfIdfCorpus = calculateTFIDF(corpus);

    return createDictionaryWithWords(
        tfIdfCorpus, wordsPercent, stopWordsDictionary
    );
};

createDictionaryWithWords = (
    wordMetrics, wordsPercent, stopWordsDictionary = undefined
) => {
    let dictionary = new TrieDictionary();
    wordMetrics.forEach(text => {
        const countWordsToAdding = Math.round(
            text.length * wordsPercent
        );

        let index = 0;
        text.every((wordObject) => {
            if (index >= countWordsToAdding) return false;

            if (stopWordsDictionary === undefined) {
                dictionary.add(wordObject.word);
                index++;
            } else {
                if (!stopWordsDictionary.isWord(wordObject.word)) {
                    dictionary.add(wordObject.word);
                    index++;
                }
            }

            return true;
        });
    });

    return dictionary;
};


run();