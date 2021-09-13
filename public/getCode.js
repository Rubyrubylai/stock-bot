import config from './config.js'
class stockTreeNode {
  constructor() {
    this.children = {}
    this.code = 0
  }
}
class stockTree {
  constructor() {
    this.root = new stockTreeNode()
  }

  insert(word, code) {
    let current = this.root
    for (let w of word) {
      if (!current.children[w]) {
        current.children[w] = new stockTreeNode()
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
let stocksTree = new stockTree();

(async function () {
  try {
    let stocks = await axios({
      url: `${config.domain}/stockTree`,
      method: 'GET'
    })
    stocks = stocks.data.data
    for (let stock of stocks) {
      stocksTree.insert(stock.name, stock.code)
    }
  }
  catch(err) {
    console.error(err)
  }
})();

window.addEventListener('keyup', async function getCode () {
  try {
    const prefix = $('#code').val()
    // let codeName = await axios({
    //   url: `${config.domain}/stockTree/find`,
    //   method: 'GET',
    //   params: {
    //     prefix: code
    //   }
    // })
    let result = stocksTree.startsWith(prefix)
    let findStockArr = [];
    findAllWord(result, findStockArr, prefix, [])

    let name= document.getElementById('nameList')
    name.innerHTML = ''
    findStockArr.forEach(code => {
      name.innerHTML += `<option class="code-option" value="${code.code} ${code.name}"> `
    })
  }
  catch(err) {
    console.error(err)
  }
})

function findAllWord(stocks, findStockArr, prefix, accumWord) {
  if (stocks.code) {
    let word = prefix + accumWord.join('')
    findStockArr.push({
      name: word,
      code: stocks.code
    })
  }
  
  for (let child in stocks.children) {
    accumWord.push(child)
    findAllWord(stocks.children[child], findStockArr, prefix, accumWord)
    accumWord.pop()
  }
}
