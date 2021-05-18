module.exports = {
    stringToNumber: (string) => {
        string = string.replace(/,/g, '')
        return Number(string)
    },
    stringToNumberDivide: (string) => {
        string = string.replace(/,/g, '')
        return Math.round(Number(string)/1000)
    }
}