module.exports = {
    stringToNumber: (string) => {
        string = string.replace(/,/g, '')
        return Number(string)
    },
    stringToNumberDivide: (string) => {
        string = string.replace(/,/g, '')
        return Math.round(Number(string)/1000)
    },
    difference: (diff) => {
        return diff > 0 ?`+${diff}`.toLocaleString() : diff.toLocaleString()
    },
    toLocaleString: (number) => {
        return number ? number.toLocaleString() : (number === 0 ? 0 : '--')
    }
}