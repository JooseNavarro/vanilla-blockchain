const express = require('express')
const BlockChain = require('./modules/blockchain/')
const app = express()
const port = 3000

app.get('/chain', (req, res) => {
    res.send(new BlockChain().chain)
})

app.listen(port, () => {
    console.log(`Run blockchain http://localhost:${port}`)
})
