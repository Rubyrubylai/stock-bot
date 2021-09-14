import config from './config.js';
import stockTrie from './stockTrie.js';
let stocksTrie = new stockTrie();
let env = document.getElementById('env').value

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

(async function () {
  try {
    let stocks = await axios({
      url: `${config.domain[env]}/listAllStocks`,
      method: 'GET'
    })
    stocks = stocks.data.data
    for (let stock of stocks) {
      stocksTrie.insert(stock.name, stock.code)
    }
  }
  catch(err) {
    console.error(err)
  }
})();

let stockInput = document.getElementById('code')
stockInput.addEventListener('keyup', function getCode(e) {
  const prefix = e.target.value
  if (prefix.length < 1) return

  let result = stocksTrie.startsWith(prefix)
  let findStockArr = []
  findAllWord(result, findStockArr, prefix, [])
  let name = document.getElementById('stockList')
  name.innerHTML = ''
  name.style.display = 'block'
  findStockArr.forEach(stock => {
    name.innerHTML += `<li class="code-option list-group-item" value="${stock.code}">${stock.code} ${stock.name}</li>`
  })

  let option = document.getElementsByClassName('code-option')
  for (var i = 0 ; i < option.length; i++) {
    option[i].addEventListener('click', handleClick, false )
  }

  function handleClick(e) {
    const text = e.target.innerHTML
    stockInput.value = text
    name.style.display = 'none'
  }
})



