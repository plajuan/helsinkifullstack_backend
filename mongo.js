const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Initialize the script with 3 arguments: password, name and number')
    process.exit(1)
}
const password = encodeURI(process.argv[2])
const url = `mongodb+srv://plajuan:${password}@cluster0.7d32nss.mongodb.net/phoneApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const entrySchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
})
const Entry = mongoose.model('Entry', entrySchema)

const entry =  new Entry({
    name: process.argv[3],
    phoneNumber: process.argv[4],
})

entry.save().then(res => {
    console.log(`Added ${res.name} number ${res.phoneNumber} to phonebook`)
    mongoose.connection.close()
})

