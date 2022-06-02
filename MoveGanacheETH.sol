// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;


contract GetETHbal{


    function GetEthBalance() public view returns(uint256){
        return msg.sender.balance;
    }
}