import config from './config.js'

(async function () {
  try {
    const code = $('#code').val()
    let codeName = await axios({
      url: `${config.domain}/code`,
      method: 'GET',
      params: {
        code
      }
    })

    let name= document.getElementById('nameList')
    name.innerHTML = ''
    codeName.data.data.forEach(code => {
      name.innerHTML += `<option class="code-option" value="${code.code} ${code.name}"> `
    })
  }
  catch(err) {
    console.error(err)
  }
})()