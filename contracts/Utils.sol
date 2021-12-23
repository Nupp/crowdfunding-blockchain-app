// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

library Utils {

 function etherToWei(uint sumInEth) public pure returns(uint){
     return sumInEth * 1 ether;
 }

 function minToSec(uint timeInMin) public pure returns(uint){
     return timeInMin * 1 minutes;
 }

}