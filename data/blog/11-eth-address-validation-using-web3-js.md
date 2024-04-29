---
title: ETH Address validation using Web3.js
date: 2021-09-21
image: /assets/images/blog/11.jpg
tags: web3
---

This is going to be a super simple tutorial that will cover how to check if an Ethereum address is indeed a valid address.

This tutorial starts from a newly created [Next JS](https://nextjs.org/docs/api-reference/create-next-app) project. Also, make sure to install the [web3 library](https://www.npmjs.com/package/web3).

I’ll paste the entire file below and talk about it below the code. So, replace your _index.js_ file with this for a minimal example:

```
import { useState } from 'react'
import Web3 from 'web3'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [address, setAddress] = useState('')

  const isValidAddress = (adr) => {
    try {
      const web3 = new Web3()
      web3.utils.toChecksumAddress(adr)
      return true
    } catch (e) {
      return false
    }
  }

  return (
    <div className={styles.container}>
      <input onChange={(e) => setAddress(e.target.value)} value={address} />
      {isValidAddress(address) ? <div>Address is valid</div> : <div>Address is not valid</div>}
    </div>
  )
}
```

The code here has an input that can be typed in. On change of the input, it sets the `address` variable.

The `isValidAddress` method checks if the address is valid and then displays that in text.

This method is the valuable piece to this tutorial that most people are probably looking for. It just creates a `web3` object and calls a utility method. If `toChecksumAddress` passes without error then it is a valid address. Otherwise, the address is not valid.
