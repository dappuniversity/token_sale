const DappToken = artifacts.require("./DappToken.sol");
const DappTokenSale = artifacts.require("./DappTokenSale.sol");

module.exports = function (deployer) {
    deployer.deploy(DappToken, 1000000).then(function () {
        // Token price is 0.001 Ether
        const tokenPrice = 1000000000000000;
        return deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
    });
};
