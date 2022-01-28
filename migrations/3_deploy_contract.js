let CrowdFundingWithDeadline = artifacts.require('./CrowdFundingWithDeadline.sol')

module.exports = function(deployer) {
    deployer.deploy(
        CrowdFundingWithDeadline,
        "Test Campaign",
        1,
        200,
        "0x77CC314C9e51CCb865EE87B9244A6bce7f41802B"       
    )
}