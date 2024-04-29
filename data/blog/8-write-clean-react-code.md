---
title: Write Clean React Code
slug: write-clean-react-code
date: 2021-02-24
image: /assets/images/blog/8.jpg
tags: react
---

Clean code is more than just working code. Clean code is easy to read, simple to understand, and neatly organized. In this article, we’ll look at eight ways we can write cleaner React code.

When going through these suggestions, it’s important to remember that’s exactly what they are: suggestions. If you disagree with any of them, that’s completely fine. However, these are practices that I’ve found helpful in writing my own React code.

Let’s dive in!

### 1. Conditional Rendering Only for One Condition

If you need to conditionally render something when a condition is `true` and not render anything when a condition is `false`, don’t use a ternary operator. Use the `&&` operator instead.

Bad example:

```
import React, { useState } from 'react'

export const ConditionalRenderingWhenTrueBad = () => {
  const [showConditionalText, setShowConditionalText] = useState(false)

  const handleClick = () =>
    setShowConditionalText(showConditionalText => !showConditionalText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionalText ? <p>The condition must be true!</p> : null}
    </div>
  )
}
```

Good example:

```
import React, { useState } from 'react'

export const ConditionalRenderingWhenTrueGood = () => {
  const [showConditionalText, setShowConditionalText] = useState(false)

  const handleClick = () =>
    setShowConditionalText(showConditionalText => !showConditionalText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionalText && <p>The condition must be true!</p>}
    </div>
  )
}
```

### 2. Conditional Rendering on Either Condition

If you need to conditionally render one thing when a condition is `true` and render a different thing when the condition is `false`, use a ternary operator.

Bad example:

```
import React, { useState } from 'react'

export const ConditionalRenderingBad = () => {
  const [showConditionOneText, setShowConditionOneText] = useState(false)

  const handleClick = () =>
    setShowConditionOneText(showConditionOneText => !showConditionOneText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionOneText && <p>The condition must be true!</p>}
      {!showConditionOneText && <p>The condition must be false!</p>}
    </div>
  )
}
```

Good example:

```
import React, { useState } from 'react'

export const ConditionalRenderingGood = () => {
  const [showConditionOneText, setShowConditionOneText] = useState(false)

  const handleClick = () =>
    setShowConditionOneText(showConditionOneText => !showConditionOneText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionOneText ? (
        <p>The condition must be true!</p>
      ) : (
        <p>The condition must be false!</p>
      )}
    </div>
  )
}
```

### 3. Boolean Props

A truthy prop can be provided to a component with just the prop name without a value like this: `myTruthyProp`. Writing it like `myTruthyProp={true}` is unnecessary.

Bad example:

```
import React from 'react'

const HungryMessage = ({ isHungry }) => (
  <span>{isHungry ? 'I am hungry' : 'I am full'}</span>
)

export const BooleanPropBad = () => (
  <div>
    <span>
      <b>This person is hungry: </b>
    </span>
    <HungryMessage isHungry={true} />
    <br />
    <span>
      <b>This person is full: </b>
    </span>
    <HungryMessage isHungry={false} />
  </div>
)
```

Good example:

```
import React from 'react'

const HungryMessage = ({ isHungry }) => (
  <span>{isHungry ? 'I am hungry' : 'I am full'}</span>
)

export const BooleanPropGood = () => (
  <div>
    <span>
      <b>This person is hungry: </b>
    </span>
    <HungryMessage isHungry />
    <br />
    <span>
      <b>This person is full: </b>
    </span>
    <HungryMessage isHungry={false} />
  </div>
)
```

### 4. String Props

A string prop value can be provided in double-quotes without the use of curly braces or backticks.

Bad example:

```
import React from 'react'

const Greeting = ({ personName }) => <p>Hi, {personName}!</p>

export const StringPropValuesBad = () => (
  <div>
    <Greeting personName={"John"} />
    <Greeting personName={'Matt'} />
    <Greeting personName={`Paul`} />
  </div>
)
```

Good example:

```
import React from 'react'

const Greeting = ({ personName }) => <p>Hi, {personName}!</p>

export const StringPropValuesGood = () => (
  <div>
    <Greeting personName="John" />
    <Greeting personName="Matt" />
    <Greeting personName="Paul" />
  </div>
)
```

### 5. Event Handler Functions

If an event handler only takes a single argument for the `Event` object, you can just provide the function as the event handler like this: `onChange={handleChange}`. You don't need to wrap the function in an anonymous function like this: `onChange={e => handleChange(e)}`.

Bad example:

```
import React, { useState } from 'react'

export const UnnecessaryAnonymousFunctionsBad = () => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <label htmlFor="name">Name: </label>
      <input id="name" value={inputValue} onChange={e => handleChange(e)} />
    </>
  )
}
```

Good example:

```
import React, { useState } from 'react'

export const UnnecessaryAnonymousFunctionsGood = () => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <label htmlFor="name">Name: </label>
      <input id="name" value={inputValue} onChange={handleChange} />
    </>
  )
}
```

### 6. Passing Components As Props

When passing a component as a prop to another component, you don’t need to wrap this passed component in a function if the component does not accept any props.

Bad example:

```
import React from 'react'

const CircleIcon = () => (
  <svg height="100" width="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
)

const ComponentThatAcceptsAnIcon = ({ IconComponent }) => (
  <div>
    <p>Below is the icon component prop I was given:</p>
    <IconComponent />
  </div>
)

export const UnnecessaryAnonymousFunctionComponentsBad = () => (
  <ComponentThatAcceptsAnIcon IconComponent={() => <CircleIcon />} />
)
```

Good example:

```
import React from 'react'

const CircleIcon = () => (
  <svg height="100" width="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
)

const ComponentThatAcceptsAnIcon = ({ IconComponent }) => (
  <div>
    <p>Below is the icon component prop I was given:</p>
    <IconComponent />
  </div>
)

export const UnnecessaryAnonymousFunctionComponentsGood = () => (
  <ComponentThatAcceptsAnIcon IconComponent={CircleIcon} />
)
```

### 7. Undefined Props

Undefined props are excluded, so don’t worry about providing an `undefined` fallback if it's OK for the prop to be undefined.

Bad example:

```
import React from 'react'

const ButtonOne = ({ handleClick }) => (
  <button onClick={handleClick || undefined}>Click me</button>
)

const ButtonTwo = ({ handleClick }) => {
  const noop = () => {}

  return <button onClick={handleClick || noop}>Click me</button>
}

export const UndefinedPropsBad = () => (
  <div>
    <ButtonOne />
    <ButtonOne handleClick={() => alert('Clicked!')} />
    <ButtonTwo />
    <ButtonTwo handleClick={() => alert('Clicked!')} />
  </div>
)
```

Good example:

```
import React from 'react'

const ButtonOne = ({ handleClick }) => (
  <button onClick={handleClick}>Click me</button>
)

export const UndefinedPropsGood = () => (
  <div>
    <ButtonOne />
    <ButtonOne handleClick={() => alert('Clicked!')} />
  </div>
)
```

### 8. Setting State That Relies on the Previous State

Always set state as a function of the previous state if the new state relies on the previous state. React state updates can be batched, and not writing your updates this way can lead to unexpected results.

Bad example:

```
import React, { useState } from 'react'

export const PreviousStateBad = () => {
  const [isDisabled, setIsDisabled] = useState(false)

  const toggleButton = () => setIsDisabled(!isDisabled)

  const toggleButton2Times = () => {
    for (let i = 0; i < 2; i++) {
      toggleButton()
    }
  }

  return (
    <div>
      <button disabled={isDisabled}>
        I'm {isDisabled ? 'disabled' : 'enabled'}
      </button>
      <button onClick={toggleButton}>Toggle button state</button>
      <button onClick={toggleButton2Times}>Toggle button state 2 times</button>
    </div>
  )
}
```

Good example:

```
import React, { useState } from 'react'

export const PreviousStateGood = () => {
  const [isDisabled, setIsDisabled] = useState(false)

  const toggleButton = () => setIsDisabled(isDisabled => !isDisabled)

  const toggleButton2Times = () => {
    for (let i = 0; i < 2; i++) {
      toggleButton()
    }
  }

  return (
    <div>
      <button disabled={isDisabled}>
        I'm {isDisabled ? 'disabled' : 'enabled'}
      </button>
      <button onClick={toggleButton}>Toggle button state</button>
      <button onClick={toggleButton2Times}>Toggle button state 2 times</button>
    </div>
  )
}
```

The following practices are not React-specific but rather good practices for writing clean code in JavaScript (or any programming language, for that matter).

- Extract complex logic into clearly named functions.
- Extract magic numbers into constants.
- Use clearly named variables.
