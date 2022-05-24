const express = require('express');
const BlockChain = require('./modules/blockchain/');
const PeerToPeer = require('./modules/peer-to-peer/');
const { PEERS } = require('../src/core/constants/');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

const blockChain = new BlockChain();
const Socket = new PeerToPeer(blockChain, PEERS)

app.use(bodyParser.json());

app.get('/chain', (req, res) => {
    res.send(blockChain.chain)
})

app.post('/mine', (req, res) => {
    blockChain.add(req.body);
    Socket.updateChain();
    res.send(blockChain.chain);
})

app.listen(port, () => console.log(`Run blockchain http://localhost:${port}`, '\n'));
Socket.listen();


