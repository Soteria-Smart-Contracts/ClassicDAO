// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;


contract MoveGanacheETH {
    uint256 balance;


    function DepositEth() public payable returns(uint256){
        balance += msg.value;
        return balance;
    }

    function WithdrawEth() public payable returns(uint256){
        balance -= msg.value;
        payable(msg.sender).transfer(balance);
        return balance;
    }
}
