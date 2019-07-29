module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        ganache: {
            host: "127.0.0.1",
            port: "7545",
            network_id: "*", // match any network id
        },
        rinkeby: {
            host: "localhost",
            port: 8545,
            network_id: "*"
        },
        local_dev: {
            host: "localhost",
            port: 8545,
            gas: 890000,
            network_id: "*",
        },
        ropsten_local: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
            gas: 2900000,
            from: "0x0c40251d0028ee2fB612911A4B843b6995b8169f"
        },
        ropsten: {
            host: "https://api.infura.io/v1/jsonrpc/ropsten",
            port: 8545,
            network_id: "3"
        }
    }
};
