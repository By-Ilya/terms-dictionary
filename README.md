# terms-dictionary
Create terms dictionaries for different article categories using TF-IDF metric.

## Description
Algorithm performs the following steps:
1. Extracts texts from `.txt` files that contains texts from three different categories:
two special categories and one category with different topics.
2. Creates one corpus with all texts and two corps with texts from special categories.
3. Analyzes each corpus, tokenizes texts to words an creates list with lemmas (base form of the word).
4. Creates **stop words dictionary** and **two terms dictionaries** from specified special categories
(algorithm based on **TF-IDF metric**).
5. Writes dictionaries in `.txt` files.

## Requirements
1. `Node JS` library and `NPM` package manager.
2. Libraries installed from `package.json` file.

## Install and configure
1. Go to the project root directory.
2. Run `npm i` or `npm install` command. This command installs necessary libraries.
3. Open `.env` file and configure the following parameters:
- `CORPUS_ROOT_DIRECTORY`: `string` value, that specified directory to the corpus with texts
(absolute or relative path).
- `CATEGORY_NAME_1`: `string` value, that specified the name of the first special category
(and folder name for it in `CORPUS_ROOT_DIRECTORY`).
- `CATEGORY_NAME_2`: `string` value, that specified the name of the second special category
(and folder name for it in `CORPUS_ROOT_DIRECTORY`).
- `CATEGORY_OTHERS`: `string` value, that specified the name of the others texts
(and folder name for it in `CORPUS_ROOT_DIRECTORY`).
- `COUNT_TEXTS`: `int` value, that specified count of texts, that will be analyzed in each category
(count `.txt` input files in each category).
- `STOP_WORDS_PERCENT`: `float` value, that specified the percent of words from dictionary,
that can be attributed to the stop words.
- `TERMS_PERCENT`: `float` value, that specified the percent of words from dictionary, 
that can be attributed to the terms words from each special category.
- `OUTPUT_FOLDER`: `string` value, that specified the output directory for dictionaries 
with stop words and terms from special categories ((absolute or relative path).

After that, place into `CORPUS_ROOT_DIRECTORY` folders with `CATEGORY_NAME_1`, `CATEGORY_NAME_2`
and `CATEGORY_OTHERS` names. Each folder should contain `COUNT_TEXTS` texts (`.txt` files).
Files in each corpus should be named as `1.txt`, `2.txt`, ..., `N.txt`.

As the output you get three `.txt` files, that will be located in `OUTPUT_FOLDER` directory:
- `stopWords.txt` that contains calculated stop words;
- `CATEGORY_NAME_1.txt` that contains specific terms from `CATEGORY_NAME_1` texts
(without calculated stop words);
- `CATEGORY_NAME_2.txt` that contains specific terms from `CATEGORY_NAME_2` texts
(without calculated stop words).

## Running command
In the project root directory run `npm start` command.

See the result in the configured `OUTPUT_FOLDER` directory.

## Used `Node JS` libraries
- `natural` (version `0.6.3`) is used for _tokenizing_ input texts from corpus to words
and creating _stems_ from extracted words.
- `lemmatizer` (version `0.0.1`) is used for _creating lemmas_ from words.
