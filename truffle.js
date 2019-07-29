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
        },
        parity_dev_thiago: {
            host: "dev-parity-net.kubernetes.coinecta.com",
            port: 443,
            network_id: "*",
            from: "0x00a329c0648769A73afAc7F9381E08FB43dBEA72"
        },
        parity_dev_lucas: {
            host: "api.internal.kubernetes.coinecta.com",
            port: 32545,
            network_id: "*",
        },
        parity_dev_lucas2: {
            host: "api.internal.kubernetes.coinecta.com",
            port: 32549,
            gas: 890000,
            network_id: "*",
            from: "0x00a329c0648769A73afAc7F9381E08FB43dBEA72"
        }
    }
};
