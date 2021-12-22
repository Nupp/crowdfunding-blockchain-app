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
    mapping(address => uint) public amounts;
    bool public collected;
    uint public totalCollected;

    modifier inState(State expectedState) {
        require(state == expectedState, "Invalid state");
        _;
    }

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

    function contribute() public payable inState(State.Ongoing) {
        require(
            beforeDeadline(),
            "No contributions after the deadline"
        );
        amounts[msg.sender] += msg.value;
        totalCollected += msg.value;

        if (totalCollected >= targetAmount) {
            collected = true;
        }
    }

    function beforeDeadline() public view returns(bool) {
        return currentTime() < fundingDeadline;
    }

    function finishCrowdFunding() public inState(State.Ongoing) {
        require(!beforeDeadline(), "Cannot finish campaign before a deadline");
        if (!collected) {
            state = State.Failed;
        } else {
            state = State.Succeeded;
        }
    }

    function currentTime() virtual internal view returns (uint256) {
        return block.timestamp;
    }
}
