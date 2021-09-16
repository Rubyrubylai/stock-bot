class stockTrieNode {
    constructor() {
        this.children = {}
        this.code = 0
    }
}
class stockTrie {
    constructor() {
        this.root = new stockTrieNode()
    }

    insert(word, code) {
        let current = this.root
        for (let w of word) {
            if (!current.children[w]) {
                current.children[w] = new stockTrieNode()
            }
            current = current.children[w]
        }
        current.code = code
    }

    startsWith(prefix) {
        let current = this.root
        for (let p of prefix) {
            if (!current.children[p]) return false
            current = current.children[p]
        }
        return current
    }
}

export default stockTrie