const Block = require("./modules/block");
const Blockchain = require("./modules/blockchain");

console.log('\n');
console.log('[*] Start... \n');

const MULTIPLES_BLOCKS = ['GENESIS', 'Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5'];
const BLOCKS = [];

MULTIPLES_BLOCKS.forEach( (item, index)=> {
    const newBlock = !BLOCKS.length ? Block.createGenesis() :
        new Block(Date.now(), BLOCKS[index - 1].hash, Block.createHash({ timesTap: Date.now(), lastHash: BLOCKS[index - 1].lastHash  }), { name: item })
    BLOCKS.push(newBlock)
    console.log('  [*] New block...', index, 'Hash: ', newBlock.hash)
});

console.log('\n');
console.log('[*] Blocks...', BLOCKS.length, '\n')
console.log('[*] Build a blockchain... \n');

const blockchain = new Blockchain();
console.log('[*] Done... \n');

setInterval(()=> blockchain.add('item'), 100);

setInterval(()=> console.log('  [*]', 'Blocks:', blockchain.getBlockQuantity,  ' = ','Last Hash:', blockchain.chain.pop().hash ), 800);
