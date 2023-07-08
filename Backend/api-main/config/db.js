const mongoose = require('mongoose')

const connection = mongoose.connect(process.env.MONGO_URI)
.then((res) => {
    console.log('Connection established')
})
.catch((err) => {
    console.log("Connection Failed to DB")
})

module.exports = {connection}