const Blockchain = require('../../src/modules/blockchain')

const INITIAL_VALUE_GENESIS = 1;
const MULTIPLES_BLOCKS = ['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5']

describe('INIT', ()=> {

    let firstNode = null;
    let secondNode = null;

    beforeEach(()=> {
        firstNode = new Blockchain();
        secondNode = new Blockchain();
    })

    it('[INITIAL BLOCK GENESIS]', ()=> {
        expect(firstNode.chain[0])
            .toEqual(firstNode.getGenesisBlock);
    });

    it('[SINGLE BLOCK GENESIS]', ()=> {
        expect(firstNode.getBlockQuantity)
            .toEqual(INITIAL_VALUE_GENESIS);
    });

    it('[ADD ONE BLOCK]', ()=> {
        expect(firstNode.add({ value: `i'm a new block` }))
            .toEqual(firstNode.getLastBlock);
    });

    it('[ADD MULTIPLE BLOCKS]', ()=> {
        MULTIPLES_BLOCKS.forEach((block)=> firstNode.add({ value: block }))
        expect(MULTIPLES_BLOCKS.length + 1)
            .toEqual(firstNode.getBlockQuantity);
    });

    it('[VALIDATION BLOCK]', ()=> {
        MULTIPLES_BLOCKS.forEach((block)=> firstNode.add({ value: block }))
        secondNode.add({value: 'validation'});
        expect(secondNode.validChain(secondNode.chain)).toBe(true)
    })

    it('[REPLACE CHAIN]', ()=> {
        secondNode.add({value: 'replace'});
        firstNode.replace(secondNode.chain)
        expect(firstNode.chain).toEqual(secondNode.chain)
    })

    it('[INVALID CHAIN]', ()=> {
        secondNode.chain[1] = {value: 'INVALID'}
        expect(firstNode.chain).not.toEqual(secondNode.chain)
    })

    it('[DO NOT REPLACE THE CHAIN]', ()=> {
        MULTIPLES_BLOCKS.forEach((block)=> firstNode.add({ value: block }));
        expect(firstNode.replace(secondNode.chain).status).toBeFalsy()
    })

})
