// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

contract CrowdFundingWithDeadline {
    enum State {
        Ongoing,
        Failed,
        Succeeded,
        PaidOut
    }

    string public name;
    uint256 public targetAmount;
    uint256 public fundingDeadline;
    address public beneficiary;
    State public state;

    constructor(
        string memory contractName,
        uint256 targetAmountEth,
        uint256 durationInMin,
        address beneficiaryAddress
    ) {
        name = contractName;
        targetAmount = targetAmountEth * 1 ether;
        fundingDeadline = currentTime() + (durationInMin * 1 minutes);
        beneficiary = beneficiaryAddress;
        state = State.Ongoing;
    }

    function currentTime() internal view returns (uint256) {
        return block.timestamp;
    }
}
