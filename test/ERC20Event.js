const Web3 = require('web3');
// const web3 = new Web3('http://localhost:7545');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'))

function transfer() {
    const fs = require('fs');
    const abi = fs.readFileSync('build/contracts/DappToken.json', 'utf-8');

    let minABI = [
        // transfer
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ];

    // const dappTokenAddress = '0x976201c5DA5dfBF7d7521e993aBd1204D79C37ad';
    // const tokenAddress = '0xe28Fa34C53e6D90786B946B1728253B551c589cd';
    // const oldAddress = '0xafb7b8a4d90c2df4ce640338029d54a55bedcfc4';
    const tokenAddress = '0xd092A60Beb1A59774c570e750FfAF7AdC2d50007';

    const fromAddress = '0x6572bf58654b4dC53d6B42940E56f2922C19Fe1c';
    const toAddress = '0x0c40251d0028ee2fB612911A4B843b6995b8169f';

    const abiObj = JSON.parse(abi);
    // const contract = new web3.eth.Contract([abiObj], toAddress, {
    //     from: fromAddress,
    //     gas: 100000
    // });
    // web3.eth.defaultAccount = web3.eth.accounts[0];
    const contract = new web3.eth.Contract(minABI, tokenAddress);
    // const contract = new web3.eth.Contract(abiObj, tokenAddress);

    contract.once('Transfer', {
        fromBlock: 0
    }, (error, event) => {
        console.log(event);
    });

    // const ClientReceipt = web3.eth.contract(abi);
    // const clientReceipt = ClientReceipt.at("0x1234...ab67" /* address */);

    // let event = clientReceipt.Transfer();
    //
    // // watch for changes
    // event.watch(function(error, result){
    //     // result contains non-indexed arguments and topics
    //     // given to the `Deposit` call.
    //     if (!error)
    //         console.log(result);
    // });
    //
    //
    // // Or pass a callback to start watching immediately
    // let event2 = clientReceipt.Transfer(function(error, result) {
    //     if (!error)
    //         console.log(result);
    // });

    // contract.methods.balanceOf(fromAddress).call().then(console.log).catch(console.error);
    // contract.methods.balanceOf(toAddress).call().then(console.log).catch(console.error);
    contract.methods.transfer(toAddress, 1).send({from: fromAddress}).on('transactionHash', function(hash) {
        console.log('oi: ' + hash);
    }).catch(console.error);

    // contract.methods.balanceOf(fromAddress).call().then(console.log).catch(console.error);
    // contract.methods.balanceOf(toAddress).call().then(console.log).catch(console.error);
}

transfer();
