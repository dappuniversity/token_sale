var DappToken = artifacts.require("./DappToken.sol");

module.exports = function(deployer) {
  deployer.deploy(DappToken);
};
