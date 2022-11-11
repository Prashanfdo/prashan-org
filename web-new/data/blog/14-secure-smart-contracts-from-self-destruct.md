---
title: Secure Smart Contracts from Self Destruct
date: 2021-12-22
image: /assets/images/blog/13.jpg
tags: security, smart-contract,blockchain,solidity
---

The `selfdestruct(address)` function, removes all bytecode from the contract address and sends all ether stored to the specified address. If this specified address is also a contract, no functions (including the fallback) get called.

In other words, an attacker can create a contract with a `selfdestruct()` function, send ether to it, call `selfdestruct(target)` and force ether to be sent to a target.

Let's see how this attack can look like. We create a simple smart contract. Note: I created this contract based on [Solidity by example](https://solidity-by-example.org/hacks/self-destruct/).

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;



contract EtherGame {
    uint public targetAmount = 5 ether;
    address public winner;

    function play() public payable {
        require(msg.value == 1 ether, "You can only send 1 Ether");

        uint balance = address(this).balance;
        require(balance <= targetAmount, "Game is over");

        if (balance == targetAmount) {
            winner = msg.sender;
        }
    }

    function claimReward() public {
        require(msg.sender == winner, "Not winner");

        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    EtherGame etherGame;

    constructor(EtherGame _etherGame) {
        etherGame = EtherGame(_etherGame);
    }

    function attack() public payable {

        address payable addr = payable(address(etherGame));
        selfdestruct(addr);
    }
}
```

This contract represents a simple game whereby players send 1 ether to the contract hoping to be the one that reaches the threshold equal 5 eth. When the 5 eth will be reached the game is ended and the first player who reaches the milestone may claim a reward.

In this case, an attacker can e.g. send to the contract 5 eth or any other value that push the contract's balance above the threhshold. This would lock all rewards in the contract forever.

This is because our if statement in the function `play()` checks if the winner's balance is equal 5 eth.

### Preventative Techniques

This vulnerability arises from the misuse of `this.balance`. Your contract should avoid being dependent on the exact values of the balance of the contract because it can be artificially manipulated.

If exact values of deposited ether are required, a self-defined variable should be used that gets incremented in payable functions, to safely track the deposited ether. This can prevent your contract to be influenced by the forced ether sent via a `selfdestruct()` call.

Let's see how the safe version of the contract looks like.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;



contract EtherGame {
    uint public targetAmount = 5 ether;
    address public winner;
    uint public balance;

    function play() public payable {
        require(msg.value == 1 ether, "You can only send 1 Ether");

        uint balance += msg.value;
        require(balance <= targetAmount, "Game is over");

        if (balance == targetAmount) {
            winner = msg.sender;
        }
    }

    function claimReward() public {
        require(msg.sender == winner, "Not winner");

        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    EtherGame etherGame;

    constructor(EtherGame _etherGame) {
        etherGame = EtherGame(_etherGame);
    }

    function attack() public payable {

        address payable addr = payable(address(etherGame));
        selfdestruct(addr);
    }
}
```

Here, we no longer have any reference to `this.balance`. Instead, we have created a new variable, `balance` which keeps tracking of the current amount of eth.
