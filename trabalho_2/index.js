const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const app = express()
const path = require('path')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    return res.sendFile(path.join(
        __dirname+'/site/index.html'
    ))
})



app.listen(process.env.port || 3000)