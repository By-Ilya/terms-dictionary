const { outputFolder } = require('../config');
const { writeDataToFile,
} = require('./filesHelper');

writeDictionaryToFile = async (dictionary, fileName) => {
    if (!dictionary) return;

    await writeDataToFile(
        `${outputFolder}/${fileName}.txt`,
        dictionary.print().join('\n')
    );
};


module.exports = writeDictionaryToFile;