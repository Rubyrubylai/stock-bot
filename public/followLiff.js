import config from './config.js'

(async function () {
  try {
    await liff.init({
      liffId: config.follow_liffId
    })
    const context = liff.getContext()
    document.getElementById('userId').value = context.userId
  }
  catch(err) {
    console.error(err)
  }
})()