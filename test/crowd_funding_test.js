const CrowdFundingWithDeadline = artifacts.require('./TestCrowdFundingWithDeadline')
const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers")
const { expect } = require("chai")

contract('CrowdFundingWithDeadline', (accounts) => {
  const contractCreator = accounts[0]
  const beneficiary = accounts[1]

  const ONE_ETH = "1000000000000000000"
  const ERROR_MSG = 'Returned error: VM Exception while processing transaction: revert'
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

    let fundingDeadline = await this.instance.fundingDeadline()
    expect(fundingDeadline.toNumber()).to.equal(600)

    let actualBeneficiary = await this.instance.beneficiary()
    expect(actualBeneficiary).to.equal(beneficiary)

    let state = await this.instance.state()
    expect(state.valueOf().toString()).to.equal(ONGOING_STATE)
  })

  it('funds are contributed', async () => {
    await this.instance.contribute({
      value: ONE_ETH,
      from: contractCreator
    })

    let contributed = await this.instance.amounts(contractCreator)
    expect(contributed.toString()).to.equal(ONE_ETH)

    let totalCollected = await this.instance.totalCollected()
    expect(totalCollected.toString()).to.equal(ONE_ETH)
  })

  it('cannot contribute after deadline', async () => {
    try {
      await this.instance.setCurrentTime(601)
      await this.instance.sendTransaction({
        value: ONE_ETH,
        from: contractCreator
      })
      expect.fail()
    } catch (error) {
      expect(error.message).to.equal(ERROR_MSG)
    }
  })

  it('crowdfunding succeeded', async () => {
    await this.instance.contribute({
      value: ONE_ETH,
      from: contractCreator
    })
    await this.instance.setCurrentTime(601)
    await this.instance.finishCrowdFunding()
    let state = await this.instance.state()

    expect(state.valueOf().toString()).to.equal(SUCCEEDED_STATE)
  })

  it('crowdfunding failed', async () => {
    await this.instance.setCurrentTime(601)
    await this.instance.finishCrowdFunding()
    let state = await this.instance.state()

    expect(state.valueOf().toString()).to.equal(FAILED_STATE)
  })


})
