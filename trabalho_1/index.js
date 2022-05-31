const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const app = express()
const path = require('path')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


var numeros_validos = []
var numeros_invalidos = []
var atual_ganhador = null

app.get('/', (req, res) => {
    return res.sendFile(path.join(
        __dirname+'/site/index.html'
    ))
})

app.get('/api', (req, res) => {
    return res.json({
        numeros_validos: numeros_validos,
        numeros_invalidos: numeros_invalidos,
        atual_ganhador: atual_ganhador
    })
})

app.post('/api', (req, res) => {
    let numero = parseFloat(req.body.valor)

    if (!isNaN(numero) && numero > 0) {
        if (numeros_validos.includes(numero)) {
            numeros_invalidos[numeros_invalidos.length] = numero
            numeros_validos.splice(numeros_validos.indexOf(numero), 1)
    
        } else if (!numeros_invalidos.includes(numero)) {
            numeros_validos[numeros_validos.length] = numero
    
        }
    
        numeros_invalidos = numeros_invalidos.sort((a, b) => a-b)
        numeros_validos = numeros_validos.sort((a, b) => a-b)
    
        if (numeros_validos.length > 0) {
            atual_ganhador = numeros_validos[0]
        } else {
            atual_ganhador = null
        }
 
    }


    return res.json({
        numeros_validos: numeros_validos,
        numeros_invalidos: numeros_invalidos,
        atual_ganhador: atual_ganhador
    })
    
})


app.listen(process.env.port || 3000)

console.log("Server rodando com sucesso!")
console.log("Acesse: http://localhost:3000")