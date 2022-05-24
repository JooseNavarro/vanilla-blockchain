const Block = require("../block");

class Blockchain {

    chain = [];

    constructor() {
        this.chain = [Block.createGenesis()]
    }

    get getBlockQuantity() {
        return this.chain.length;
    }

    get getGenesisBlock() {
        return this.chain[0];
    }

    get getLastBlock() {
        return this.chain[this.getBlockQuantity - 1];
    }

    add(data) {
        const newBlock = Block.mine(this.getLastBlock, data);
        this.chain.push(newBlock);
        return newBlock;
    }

    validChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(this.getGenesisBlock))
            return false;

        for (let i = 1; i < chain.length; i++) {
            const currentBlock = chain[i];
            const lastBlock = chain[i - 1];
            if (currentBlock.lastHash !== lastBlock.hash || currentBlock.hash !== Block.createHash(currentBlock))
                return false;
        }
        return true;
    }

    replace(chain) {
        if (chain.length <= this.getBlockQuantity)
            return { status: false, message:'Do not replace the chain...' };
        else if(!this.validChain(chain))
            return { status: false, message: 'chain invalid' };

        this.chain = chain;
        return { status: true, message: 'Update chain...' };
    }
}


module.exports = Blockchain
