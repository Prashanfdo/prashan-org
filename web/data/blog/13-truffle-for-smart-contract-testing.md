---
title: Truffle for Smart Contract Testing
date: 2021-12-16
image: /assets/images/blog/14.jpg
tags: ethereum, smart-contract,solidity
---

As you might know testing is very important, especially when working with smart contract and blockchain, as anything in the blockchain is immutable.

### Setup

You can **install Truffle**, an open source tool suite that will allow you to develop, test and deploy your contract.  
Use `npm install -g truffle` and you’re all set.

Then, **download Ganache** from the [Truffle website](https://trufflesuite.com/ganache/). This tool will allow you to setup a personal Ethereum blockchain that you can use to run and test your contract.

Finally, you can fire up any IDE on the project directory. I would recommend VSCode with the [Solidity plugin](https://github.com/juanfranblanco/vscode-solidity).

### Time to code

Alright, the first thing to do once you’ve downloaded everything is to init a project. To do so, create a new directory and let truffle do his thing:

```
truffle init
```

This will create a `test` Directory and `truffle-config.js` file.
We'll be using the below example contract for testing.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Fundraiser {
   address public owner;
   address[] public backers;

   constructor() {
       owner = msg.sender;
   }

   function sendMoney() public payable {
       require(msg.value > 0, "No Ether were sent.");
       backers.push(msg.sender);
   }

   function getBalance() public view returns (uint256) {
       return address(this).balance;
   }

   function endFundraising() public {
       require(msg.sender == owner, "Only the owner is allowed to end the fundraising.");
       payable(owner).transfer(address(this).balance);
   }
}
```

### Creating a test file

We’ll start by creating a new file called `fundraiser.js`. We are going to write our test in Javascript. If you are familiar with it, Truffle uses the [Mocha testing framework](https://mochajs.org/), with a few differences, it uses `contract()` instead of `describe()`.

That `contract` method is just used to logically group the tests by contract. Before executing your tests, the function make sure the contract is redeployed to the running environment.

Here, I’m assuming you have Ganache installed and running.

So in this empty JavaScript file, we will first get our compiled contract and call the `contract` method to start writing test cases:

```
const Fundraiser = artifacts.require("./Fundraiser.sol");

contract("Fundraiser", (accounts) => {

});
```

The `contract` method has two parameter, the first one would be the name of the contract and the second one is a function that gives you a parameter with a list of account that your environment provided for testing. That’s in that function that we will describe out test cases with Mocha’s `it` function.

Just like contract, two parameters, a description of the test and the actual test.  
We can describe as many tests as we need.

```
const Fundraiser = artifacts.require("./Fundraiser.sol");

contract("Fundraiser", (accounts) => {
    it("some test", async () => {
        // ...
    });
    it("some other test", async () => {
        // ...
    });
});
```

## Interacting with our contract

While testing a contract you will need to interact with it. The first thing you would want is to access an instance. From the artifact, you can call the `.deployed()`.

```
const contract = await Fundraiser.deployed();

```

To access a public variable from your contract, we will use the `call()` function.

```
const owner = await contract.owner.call();

```

Finally, to call a public function just call the function like you would to on any object.

```
let balance = await contract.getBalance();

```

To add a value or specify the caller’s address, add an optional object :

```
await contract.sendMoney({from: '0x0...', value: 1});

```

Note: value is in Gwei (1 Gwei = 0,00000001 Ether), to send Ether, just multiply the value by 10 to the power of 18 (`10**18` in JavaScript).  
You can also the gas and some data as parameter. More on the [Truffle documentation](https://trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts.html).

Now you should have anything needed to test our contract.

## Writing some tests

The first one will verify if the `backers` array get properly populated after a backer would have sent some Ether.

```
    it("check the participants array after participation", async () => {
        // Get the first account
        let account = accounts[0];
        // Retreive the deployed contract
        const contract = await Fundraiser.deployed();
        // Make the account send 14 gwei
        await contract.sendMoney({from: account, value: 14});
        // Get the particpant at index 0
        let backer = await contract.backers.call(0);
        // Check if that participant is the same as the addess we used
        assert.equal(backer, account);
    });

```

We will write another test to check the balance increase.

```
    it("check the balance increase", async () => {
        // Get the first account
        let account = accounts[0];
        // Retreive the deployed contract
        const contract = await Fundraiser.deployed();
        // Get the balance before the operation
        let balanceBefore = await contract.getBalance();
        // Send 1 gwei
        await contract.sendMoney({from: account, value: 1});
        // Get the balance after the gwei was sent
        let balanceAfter = await contract.getBalance();
        // Check if the balance after is equal to the balance before plus 1
        assert.equal(balanceAfter.toString(), parseInt(balanceBefore.toString())+1);
    });

```

One last test to check the end of the fundraising.

```
    it("check the balance after the fundraising ends", async () => {
        // Retreive the deployed contract
        const contract = await Fundraiser.deployed();
        // Get the contract owner by accessing the owner attribute
        const contractOwner = contract.owner.call();
        let contractsBalanceBefore = await contract.getBalance();
        let ownersBalanceBefore = await web3.eth.getBalance(contractOwner);
        // End the fund raising
        await contract.endFundraising({from: contractOwner});
        let contractsBalanceAfter = await contract.getBalance();
        let ownersBalanceAfter = await web3.eth.getBalance(contractOwner);
        // Check if the contract balance is now zero
        assert.equal(contractsBalanceAfter, 0);
        // Check if the owner account received the contract's balance
        assert.equal(ownersBalanceBefore >= ownersBalanceAfter+contractsBalanceBefore, true);
    });

```

Looks like we now have a decent code coverage for our contract.

We can just run the tests with the command `truffle test`.

Dont hesitate to check out the amazing documentation from the [truffle website](https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript.html). You can also check the [Mocha documentation](https://mochajs.org/).
