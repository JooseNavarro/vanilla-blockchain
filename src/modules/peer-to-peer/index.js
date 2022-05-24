const Ws = require('ws');

const PORT_SOCKET = process.env.PORT_SOCKET || 2000;

class PeerToPeer {

    sockets = [];
    peers = [];
    blockchain = null;

    constructor(blockchain, peers = []) {
        this.blockchain = blockchain;
        this.peers = peers;
    }

    listen() {
        this.connectToPeers();
        const server = new Ws.Server({ port: PORT_SOCKET });
        server.on('connection', socket => this.connectSocket(socket));
        console.log('Run socket in Port: ', PORT_SOCKET)
    }

    connectToPeers() {
        this.peers.forEach((peer => {
            const socket = new Ws(peer);
            socket.on('open', ()=> this.connectSocket(socket, peer));
            socket.on('error', ()=> console.log('[*] Node not found:', peer));
        }));
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        this.listenSocket(socket);
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    listenSocket(socket) {
        socket.on('message', chain =>
            this.blockchain.replace(JSON.parse(chain)))
    }

    updateChain() {
        this.sockets.forEach( socket =>
            socket.send(JSON.stringify(this.blockchain.chain)))
    }
}

module.exports = PeerToPeer;
