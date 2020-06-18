module.exports = {

    date(timeStamp){
        const date = new Date(timeStamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1 }`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return{
            iso: `${year}-${month}-${day}`,
        }
    }
}