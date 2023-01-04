---
title: Deploy Smart Contracts on Polygon (Matic) Network and Error Handling
date: 2022-02-04
image: /assets/images/blog/15.jpg
tags: ethereum, smart-contract,matic
---

Here we will check out how to deploy smart contracts to the Polygon (Matic) Mumbai test network. We'll cover some of the possible errors which might occur during the deployment.

### 1. MetaMask setup.

To deploy the smart contracts on Matic you first have to create a Matic network in MetaMask wallet.  
`Settings -> Networks -> Add network -> Save`  
![MetaMask Setup](/assets/images/blog/15.1.png)  
To get test Matic for deployment and testing,  
`go to ->` [Matic Faucet](https://faucet.matic.network/) `-> Select Mumbai -> Paste wallet address -> Submit`  
Done! check your wallet, you'll see some Matic there.

### 2. truffle-config

- `truffle-config.js` for Mac users
- `truffle.js` for Windows users The truffle-config file is an important file to understand. In this file, we must configure the path to the DTube Solidity file (smart contract), the contract ABI, and define the available **networks**.

```
const HDWalletProvider = require("@truffle/hdwallet-provider")
require('dotenv').config(); // Load .env file

module.exports = {
  networks: {
   // For Ganache, your personal blockchain
   development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port
      network_id: "*",       // Any network (default: none)
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

```

Ensure you create an `.env` file in the project root directory (`~/DTube/.env`) and paste into it the Secret Recovery Phrase (12 words) of your preferably newly generated and testnet-only MetaMask wallet with the variable name MNEMONIC. This will be loaded by truffle at runtime, and the environment variable can then be accessed with `process.env.MNEMONIC`.

```
MNEMONIC= 12 secret words here..
```

Now, let's add `matic` network in our truffle-config file which will contain our environment variable MNEMONIC and RPC URL.

```
matic: {
  provider: () => new HDWalletProvider(process.env.MNEMONIC,
  `https://rpc-mumbai.matic.today`),
  network_id: 80001,
  confirmations: 2,
  timeoutBlocks: 200,
  skipDryRun: true,
  gas: 6000000,
  gasPrice: 10000000000,
},

```

You can set the gas price and gas limits for faster transactions as shown in the above code block.

### 3. Deploy Smart Contracts

Command: `truffle migrate --network matic`  
If you're deploying it second time then deploy with this command just to **reset** and avoid JSON errors.  
Command: `truffle migrate --network matic --reset`  
If everything worked fine, you'll see something like this:

```
2_deploy_contracts.js
=====================

   Replacing 'MyContract'
   ------------------
   > transaction hash:    0x1c94d095a2f629521344885910e6a01076188fa815a310765679b05abc09a250
   > Blocks: 5            Seconds: 5
   > contract address:    0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB
   > block number:        2371252
   > block timestamp:     1578238698
   > account:             0x9fB29AAc15b9A4B7F17c3385939b007540f4d791
   > balance:             79.409358061899298312
   > gas used:            1896986
   > gas price:           0 gwei
   > value sent:          0 ETH
   > total cost:          0 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 5 (block: 2371262)
initialised!

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:                   0 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0 ETH

```

_Code snippet from matic truffle docs._

### 4. Dealing with different errors

If you get any of these errors then follow these steps

#### Error:

```
Error: PollingBlockTracker - encountered an error while attempting to update latest block:

```

#### Fix_1:

Change `https://rpc-mumbai.matic.today` by using [Infura custom RPC](https://infura.io/)  
`infura -> Create new project -> Settings -> Endpoints -> Polygon Mumbai`

```
    matic: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC,
      `https://polygon-mumbai.infura.io/v3/process.env.PROJECT_ID`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

```

Paste your PROJECT_ID there from .env file.  
`truffle migrate --network matic --reset`

If still dealing with error, try this 2nd fix.

#### Fix_2:

Change `https://rpc-mumbai.matic.today` by using [Matic custom RPC](https://rpc.maticvigil.com/)

```
    matic: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC,
      `https://rpc-mumbai.maticvigil.com/v1/process.env.PROJECT_ID`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

```

Paste your PROJECT_ID there from .env file.  
`truffle migrate --network matic --reset`

#### Error:

```
*** Deployment Failed ***

"Migrations" -- only replay-protected (EIP-155) transactions allowed over RPC.

```

#### Fix:

`npm install @truffle/hdwallet-provider@1.4.0`  
Truffle hdwallet-provider version 1.4.0 will fix this error.

#### Error:

```
Error:  *** Deployment Failed ***

"Migrations" -- Transaction was not mined within 750 seconds, please make sure your transaction was properly sent. Be aware that it might still be mined!.

```

#### Fix:

```
    matic: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC,
      `https://rpc-mumbai.maticvigil.com/v1/process.env.PROJECT_ID`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 100000,
    },
  },

```

Just add `networkCheckTimeout: 100000`
