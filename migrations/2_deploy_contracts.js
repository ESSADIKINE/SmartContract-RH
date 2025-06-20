const RHContract = artifacts.require("RHContract");
 
module.exports = function (deployer) {
  // Déployer le smart contract RHContract
  deployer.deploy(RHContract);
}; 