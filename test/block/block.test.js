const Block = require('../../src/modules/block')

const  VALUE_HASH = 64;

describe('INIT BLOCK', ()=> {

    it('[INITIAL BLOCK GENESIS]', ()=> {
        expect(Block.createGenesis().data.value)
            .toEqual(`i'm genesis`);
    });

    it('[CREATE HASH]', ()=> {
        expect(Block.createHash({ timesTap: Date.now(),  lastHash: '', data: { value: ''} }).length)
            .toEqual(VALUE_HASH);
    });

    it('[MINE BLOCK]', ()=> {
        const firstBlock = Block.createGenesis();
        expect(Block.mine(firstBlock, { value: 'second block' }).data.value)
            .toEqual('second block');
    });
})
