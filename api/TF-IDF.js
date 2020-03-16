calculateTFIDF = (corpus) => {
    let tfIdfList = [];

    corpus.forEach(text => {
        let tfIdfMetricForText = [];
        const tfMetricForText = calculateTF(text);
        tfMetricForText.forEach((tf, word) => {
            tfIdfMetricForText.push({
                word: word,
                metric: tf * calculateIDF(word, corpus)
            });
        });
        tfIdfList.push(
            tfIdfMetricForText.sort(metricsSortRule)
        );
    });

    return tfIdfList;
};

calculateTF = (text) => {
    let tfMetric = new Map();
    wordsCounter(text).forEach((count, word) => {
        tfMetric.set(word, (count / text.length));
    });

    return tfMetric;
};

calculateIDF = (word, corpus) => {
    let countTextsWithWord = 0;
    corpus.forEach(text => {
        text.every(w => {
            if (isEqual(w, word)) {
                countTextsWithWord++;
                return false;
            } else return true;
        });
    });

    return Math.log10(corpus.length / countTextsWithWord);
};

wordsCounter = (text) => {
    let countWordsMap = new Map();
    text.forEach(word => {
        word = word.toLowerCase();
        if (countWordsMap.has(word)) {
            let count = countWordsMap.get(word);
            countWordsMap.set(word, ++count);
        } else {
            countWordsMap.set(word, 1);
        }
    });

    return countWordsMap;
};

isEqual = (word1, word2) => {
    return word1.toLowerCase() === word2.toLowerCase();
};

metricsSortRule = (a, b) => {
    return b.metric - a.metric;
};


module.exports = calculateTFIDF;