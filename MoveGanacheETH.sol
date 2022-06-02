// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;


contract MoveGanacheETH {
    uint256 balance;


    function DepositEth() public payable returns(uint256){
        balance += msg.value;
        return balance;
    }

    function WithdrawEth(uint256 amount) public payable returns(uint256){
        balance -= msg.value;
        
        return balance;
    }
}