let CrowdFundingWithDeadline = artifacts.require('./CrowdFundingWithDeadline.sol')

module.exports = function(deployer) {
    deployer.deploy(
        CrowdFundingWithDeadline,
        "Test Campaign",
        1,
        200,
        "0xEe2e3A92eC01B2741cC45A4bEcD777b1f86e2c3d"       
    )
}