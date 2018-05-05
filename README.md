# @znck/promised [![Build Status](https://circleci.com/gh/znck/promised/tree/master.svg?style=shield)](https://circleci.com/gh/znck/promised/)

A utility to make any callback based module/object to return promises.

## Installation

``` bash
npm add @znck/promised # or `pnpm add @znck/promised` or `yarn add @znck/promised`
```

## Usage

``` js
import promised from '@znck/promised'
import * as fs from 'fs'

// ...
if (await promised(fs).exists('example.txt')) {
  const contents = await promised(fs).readFile('example.txt')
  // ...
}

```
