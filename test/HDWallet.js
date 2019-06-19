const bip39 = require('bip39');

// const mnemonic = bip39.generateMnemonic(); //generates string
const mnemonic = 'cover ordinary budget champion bar reward goddess good feel size aerobic move';
console.log(`mnemonic: ${mnemonic}`);
// const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer
// const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex'); //creates seed buffer
const seed = '9b58c67cb356c9a7219fe7ab1e16fd0f6aac76ab2343ecfd77c3c547327017a1';
console.log(`seed: ${seed}`);


const hdkey = require('hdkey');
const root = hdkey.fromMasterSeed(seed);
const masterPrivateKey = root.privateKey.toString('hex');
console.log(`masterPrivateKey: ${masterPrivateKey}`);

// const addrNode = root.derive("m/44'/60'/0'/0/0"); // line1
const addrNode = root.derive("m/44'/60'/0'/0"); // line1
// console.log(`addrNode: ${addrNode}`);

const ethUtil = require('ethereumjs-util');
const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
console.log(`privateKey: ${addrNode._privateKey.toString('hex')}`);
console.log(`pubKey: ${pubKey.toString('hex')}`);
const addr = ethUtil.publicToAddress(pubKey).toString('hex');
console.log(`addr: ${addr}`);
const address = ethUtil.toChecksumAddress(addr);
console.log(`address: ${address}`);
/*
   If using ethereumjs-wallet instead do after line 1:
   const address = addrNode.getWallet().getChecksumAddressString();
*/


let extPubKey = 'xpub6ERoQFMqiUoTXAL56JpQYLq5FyXaZypJiKdsAbHKzMUQsSiJTNSMnBtYYRXxda9C6fUx6mMMqatUDNFSKxxXcpBcpPkTqVwyethpWiQN8p5';

const whdkey = require('ethereumjs-wallet/hdkey');
const hdwallet = whdkey.fromExtendedKey(extPubKey);
const wallet = hdwallet.getWallet();
const address1 = wallet.getAddress();

console.log(`Address: 0x${address1.toString('hex')}`);

//Ethereum
const params = {
    nonce: 12,
    to: '0x0c40251d0028ee2fB612911A4B843b6995b8169f', //'0x4584158529818ef77D1142bEeb0b6648BD8eDb2f',
    value: '0xde0b6b3a7640000',
    gasPrice: 5000000000,
    gasLimit: 21000,
    chainId: 3
};

// const params = {
//     nonce: 10,
//     to: '0xA7e90956d409171a76e4833c23c7538ed4045B23', //Contract address
//     value: '0.000539',
//     gasPrice: 10000000000,
//     gasLimit: 53917,
//     chainId: 3//,
//     // data: '0xa9059cbb0000000000000000000000000c40251d0028ee2fb612911a4b843b6995b8169f0000000000000000000000000000000000000000000000000000000000000001'
// };

const ethTx = require('ethereumjs-tx').Transaction;
const tx = new ethTx(params);
//Signing the transaction with the correct private key
tx.sign(addrNode._privateKey);
const serializedTx = tx.serialize();
console.log(`serializedTx: ${serializedTx.toString('hex')}`);

const Web3 = require('web3');
const web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:7545')
);
//Verify connection is successful
web3.eth.net.isListening()
    .then(() => console.log('is connected'))
    .catch(e => console.log('Wow. Something went wrong'));

web3.eth.sendSignedTransaction(
    `0x${serializedTx.toString('hex')}`,
    (error, result) => {
        if (error) { console.log(`Error: ${error}`); }
        else { console.log(`Result: ${result}`); }
    }
);
