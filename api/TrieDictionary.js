let Node = function () {
    this.keys = new Map();
    this.end = false;

    this.setEnd = () => {
        this.end = true;
    };
    this.isEnd = () => {
        return this.end;
    };
};

let TrieDictionary = function () {
    this.root = new Node();

    this.add = (word, node = this.root) => {
        if (word.length === 0) {
            node.setEnd();
            return;
        }
        if (!node.keys.has(word[0])) {
            node.keys.set(word[0], new Node());
            return this.add(word.substr(1), node.keys.get(word[0]));
        }
        return this.add(word.substr(1), node.keys.get(word[0]));
    };

    this.isWord = (input) => {
        let node = this.root;
        while (input.length > 1) {
            if (!node.keys.has(input[0]))
                return false;

            node = node.keys.get(input[0]);
            input = input.substr(1);
        }

        return (node.keys.has(input) && node.keys.get(input).isEnd());
    };

    this.print = () => {
        let words = [];

        let search = function(node, string) {
            if (node.keys.size !== 0) {
                for (let letter of node.keys.keys()) {
                    search(node.keys.get(letter), string.concat(letter));
                }
                if (node.isEnd()) {
                    words.push(string);
                }
            } else {
                string.length > 0 ? words.push(string) : undefined;
            }
        };

        search(this.root, String());
        return words.length > 0 ? words : undefined;
    };
};


module.exports = TrieDictionary;