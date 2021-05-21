const axios = require('axios')

module.exports = {
    taiwanStockRequest: axios.create({
        baseURL: 'https://www.twse.com.tw/'
    }),
    goodInfoRequest: axios.create({
        baseURL: 'https://goodinfo.tw/'
    })
}