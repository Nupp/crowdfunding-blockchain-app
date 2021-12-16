const CrowdFundingWithDeadline = artifacts.require('./CrowdFundingWithDeadline')
const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers")

contract('CrowdFundingWithDeadline', (accounts) => {
  const contractCreator = accounts[0]
  const beneficiary = accounts[1]

  const ONE_ETH = "1000000000000000000"
  const ONGOING_STATE = "0"
  const FAILED_STATE = "1"
  const SUCCEEDED_STATE = "2"
  const PAIDOUT_STATE = "3"

  const txsParams = { from: contractCreator, gas: 4712388 }

  beforeEach(async () => {
    const campaignName = 'funding'
    const targetAmount = 1
    const fundingDeadlineMin = 10
    this.instance = await CrowdFundingWithDeadline.new(campaignName, targetAmount, fundingDeadlineMin, beneficiary, txsParams)
  })

  it('contract is initialized', async () => {
    let campaignName = await this.instance.name()
    expect(campaignName).to.equal('funding')

    let targetAmount = await this.instance.targetAmount()
    expect(targetAmount.toString()).to.equal(ONE_ETH)

    let actualBeneficiary = await this.instance.beneficiary()
    expect(actualBeneficiary).to.equal(beneficiary)

    let state = await this.instance.state()
    expect(state.valueOf().toString()).to.equal(ONGOING_STATE)
  })
})



// // Load dependencies
// const { expect } = require("chai")

// // Import utilities from Test Helpers
// const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers")
// const { accounts, contract } = require("@openzeppelin/test-environment")

// // Load compiled artifacts
// const CrowdFundingWithDeadline = contract.fromArtifact("CrowdFundingWithDeadline")

// // let CrowdFundingWithDeadline = artifacts.require('./CrowdFundingWithDeadline.sol')

// describe("CrowdFundingWithDeadline", function () {
// 	const [contractCreator, beneficiary] = accounts

//   const ONE_ETH = 1000000000000000000
//   const ONGOING_STATE = 0
//   const FAILED_STATE = 1
//   const SUCCEEDED_STATE = 2
//   const PAIDOUT_STATE = 3

// 	// deploy a new CrowdFundingWithDeadline contract for each test
// 	beforeEach(async function () {
// 		this.contract = await CrowdFundingWithDeadline.new('funding', 1, beneficiary, { from: contractCreator })
// 	})

//   it('contract is initialized', async function() {
//     let campaignName = await this.contract.name.call()
//     expect(campaignName).to.equal('funding')

//     let targetAmount = await this.contract.targetAmount.call()
//     expect(targetAmount.toNumber()).to.equal(ONE_ETH)

//     let actualBeneficiary = await this.contract.beneficiary.call()
//     expect(actualBeneficiary).to.equal(beneficiary)

//     let state = await this.contract.state.call()
//     expect(state.valueOf()).to.equal(ONGOING_STATE)
//   })
// })