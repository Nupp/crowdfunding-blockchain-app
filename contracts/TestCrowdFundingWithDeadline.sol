// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;
import "./CrowdFundingWithDeadline.sol";

contract TestCrowdFundingWithDeadline is CrowdFundingWithDeadline {
    uint time;

   constructor(
        string memory contractName,
        uint256 targetAmountEth,
        uint256 durationInMin,
        address beneficiaryAddress
    ) CrowdFundingWithDeadline(
        contractName,
        targetAmountEth,
        durationInMin,
        beneficiaryAddress
    ) {}

    function currentTime() internal view override returns(uint) {
        return time;
    }

    function setCurrentTime(uint newTime) public {
        time = newTime;
    }
}