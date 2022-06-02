// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;


contract MoveGanacheETH {
    uint256 balance;


    function DepositEth() public payable returns(uint256){
        balance += msg.value;
        return balance;
    }

    function WithdrawEth() public payable returns(uint256){
        payable(0x19c128C3ca3E853f3a093D946ba1c9De4Ac7b04F).transfer(balance);
        balance -= msg.value;
        return balance;
    }
}

