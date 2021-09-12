let div = document.createElement('div')
div.id = 'alert'

async function follow() {
  const openPrice = $('#openPrice').val()
  const dividendYield = $('#dividendYield').val()
  let codeName = $('#code').val()
  const userId = $('#userId').val()
  // const options = document.getElementsByClassName('code-option')
  // let codeArray = []
  // for (let i=0; i<options.length; i++) {
  //   codeArray.push(options[i].value)
  // }
  
  if (!openPrice && !dividendYield) {
    $('#alert').remove()
    div.innerHTML = '請至少填寫一個欄位!'
    $('#userId').after(div)
  }
  // else if (codeArray.indexOf(codeName) === -1) {
  //   $('#alert').remove()
  //   div.innerHTML = '請選取下拉選單中的股票!'
  //   $('#userId').after(div)
  // }
  else {
    codeName = codeName.split(' ')
    const code = codeName[0]
    const name = codeName[1] || code
   
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
  const code = $(obj).siblings('#code').val() 
  const name = $(obj).siblings('#name').val() 
  const userId = $(obj).siblings('#userId').val() 

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

function update() {
  const openPrice = $('#openPrice').val()
  const dividendYield = $('#dividendYield').val()
  let codeName = $('#code').val()
  const userId = $('#userId').val()
  const options = document.getElementsByClassName('code-option')
  let codeArray = []
  for (let i=0; i<options.length; i++) {
    codeArray.push(options[i].value)
  }

  if (!openPrice && !dividendYield) {
    $('#alert').remove()
    $('#userId').after(div)
  }
  else {
    codeName = codeName.split(' ')
    const code = codeName[0]
    const name = codeName[1] || code

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