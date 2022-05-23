const { createHash } = require('crypto')

class Block {

    timesTap = null;
    lastHash = null;
    hash = null;
    data = null;

    constructor(timesTap, lastHash, hash, data) {
        this.timesTap = timesTap;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    static createGenesis() {
        const initHash = '0'.repeat(64);
        return new Block('13-01-2022', initHash, initHash, { value: `i'm genesis` })
    }

    static createHash({ timesTap, lastHash, data }) {
        return createHash('sha256').update(`${timesTap}${lastHash}${data}`)
            .digest('hex');
    }

    static mine(lastBlock, data) {
        const payload = { timesTap: Date.now(), lastHash: lastBlock.hash, data };
        const newHash = this.createHash(payload);
        return new this(Date.now(), lastBlock.hash, newHash, data);
    }

}

module.exports = Block;
