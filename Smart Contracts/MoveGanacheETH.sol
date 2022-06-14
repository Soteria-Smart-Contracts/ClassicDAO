// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;


contract MoveGanacheETH {


    function MoveETH() public payable{
        payable(0x19c128C3ca3E853f3a093D946ba1c9De4Ac7b04F).transfer(msg.value);
    }
}

