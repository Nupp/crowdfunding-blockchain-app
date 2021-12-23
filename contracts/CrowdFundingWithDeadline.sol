// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

contract CrowdFundingWithDeadline {
    enum State {
        Ongoing,
        Failed,
        Succeeded,
        PaidOut
    }

    event CampaignFinished(address addr, uint totalCollected, bool succeeded);

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

    function collect() public inState(State.Succeeded) {
        if (payable(beneficiary).send(totalCollected)) {
            state = State.PaidOut;
        } else {
            state = State.Failed;
        }
    }

    function withdraw() public inState(State.Failed) {
        require(amounts[msg.sender] > 0, "Nothing was contributed");
        uint contributed = amounts[msg.sender];
        amounts[msg.sender] = 0;

        if (!payable(msg.sender).send(contributed)) {
            amounts[msg.sender] = contributed;
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

        emit CampaignFinished(address(this), totalCollected, collected);
    }

    function currentTime() virtual internal view returns (uint256) {
        return block.timestamp;
    }
}
