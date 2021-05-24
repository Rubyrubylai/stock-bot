function follow(obj) {
  const openPrice = $('#openPrice').val()
  const dividendYield = $('#dividendYield').val()
  const code = $('#code').val()
  const name = $('#name').val()
  const userId = $('#userId').val()
  if (!openPrice && !dividendYield) {
    $('.alert').text('請至少填寫一個欄位!')
  }
  else {
    $.ajax({
      method: 'POST',
      url: '/follow',
      data: { openPrice, dividendYield, code, userId },
      dataType: 'text',
      success: function() {
        window.alert(`已成功幫您將「${name}」加入追蹤列表，當股票到達您設定的價格，小幫手會提醒您`)
        liff.closeWindow()
      },
      error: function(err) {
        console.error(err)
      }
    })
  }
}

function unfollow(obj) {
  const code = $('#code').val()
  const name = $('#name').val()
  const userId = $('#userId').val()
  $.ajax({
    method: 'DELETE',
    url: '/follow',
    data: { code, userId },
    dataType: 'text',
    success: function() {
      $('.modal').modal('hide')
      window.alert(`已成功幫您取消追蹤「${name}」`)
      liff.closeWindow()
    },
    error: function(err) {
      console.error(err)
    }
  })
}

function update(obj) {
  const openPrice = $('#openPrice').val()
  const dividendYield = $('#dividendYield').val()
  const code = $('#code').val()
  const name = $('#name').val()
  const userId = $('#userId').val()
  if (!openPrice && !dividendYield) {
    $('.alert').text('請至少填寫一個欄位!')
  }
  else {
    $.ajax({
      method: 'PUT',
      url: '/follow',
      data: { openPrice, dividendYield, code, userId },
      dataType: 'text',
      success: function() {
        window.alert(`已成功幫您更新「${name}」的追蹤價格，當股票到達您設定的價格，小幫手會提醒您`)
        liff.closeWindow()
      },
      error: function(err) {
        console.error(err)
      }
    })
  }
}