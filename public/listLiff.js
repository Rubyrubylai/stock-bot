import config from './config.js'

(async function () {
  try {
    await liff.init({
      liffId: config.list_liffId
    })
    const context = liff.getContext()

    let result = await axios({
      url: `${config.domain}/list`,
      method: 'GET', 
      params: {
        userId: context.userId
      }
    })
    let table = document.getElementById('tbody')
    result.data.data.followingStocks.forEach(stock => {
      table.innerHTML += `
      <tr>
        <td>${stock.code}</td>
        <td>${stock.Technical.name}</td>
        <td>${stock.openPrice}</td>
        <td>${stock.dividendYield}</td>
        
        <td><button data-toggle="modal" data-target="#unfollowModal-${stock.code}" class="list-btn">刪除</button></td>
        <td><a href="/form?code=${stock.code}&name=${stock.Technical.name}&userId=${result.data.data.userId}&hasCode=true">更新</a></td>
      </tr>

      <div class="modal fade" id="unfollowModal-${stock.code}" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">取消追蹤股票</h5>
              <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              請問您確定要取消追蹤股票「${stock.Technical.name}」嗎?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-dark cancel-btn" data-dismiss="modal">取消</button>
              <input type="hidden" name="code" id="code" value="${stock.code}">
              <input type="hidden" name="name" id="name" value="${stock.Technical.name}">
              <input type="hidden" name="userId" id="userId" value="${result.data.data.userId}">
              <button onclick="unfollow(this)" class="btn btn-dark confirm-btn">確定</button>
            </div>
          </div>
        </div>
      </div>
      `
    })
  }
  catch(err) {
    console.error(err)
  }
})()