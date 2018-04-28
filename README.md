![logo-qm](./pic/logo-qm.jpg)

# qm-txt-splitByHyphen [![npm version](https://badge.fury.io/js/qm-txt-splitbyhyphen.svg)](https://badge.fury.io/js/qm-txt-splitbyhyphen) [![Build Status](https://travis-ci.org/qaraluch/qm-txt-splitByHyphen.svg?branch=master)](https://travis-ci.org/qaraluch/qm-txt-splitByHyphen) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Tiny module for splitting string by its hyphen (and hyphen-like chars). It is recognizing following characters:

* `\u002D` - HYPHEN-MINUS (-)
* `\u2010` - HYPHEN (‐)
* `\u2011` - NON-BREAKING HYPHEN (‑)
* `\u2012` - FIGURE DASH (‒)
* `\u2013` - EN DASH (–)
* `\u2014` - EM DASH (—)
* `\u2015` - HORIZONTAL BAR (―)
* `\u2E3A` - TWO-EM DASH (⸺)
* `\u2E3B` - THREE-EM DASH (⸻)
* `\uFE58` - SMALL EM DASH (﹘)
* `\uFE63` - SMALL HYPHEN-MINUS (﹣)
* `\uFF0D` - FULLWIDTH HYPHEN-MINUS (－)

## Installation

```sh
$ npm i -S qm-txt-splitbyhyphen
```

## Usage

```js
const splitByHyphen = require("qm-txt-splitbyhyphen");
```

```js
splitByHyphen("tere|fere"); //-> undefined
splitByHyphen("tere - fere"); //-> ["tere", "fere"]
splitByHyphen("a-b‐c‑d‒e–f⸺g"); //-> ["a", "b", "c", "d", "e", "f", "g"]
```

TitleSplit mode in witch splits string by only one hyphen e.g:

```js
splitByHyphen("a-b-c-d-e-f-g", 1); // -> ["a", "b-c-d-e-f-g"]
splitByHyphen("a-b-c-d-e-f-g", 2); // -> ["a-b", "c-d-e-f-g"]
splitByHyphen("a-b-c-d-e-f-g", 3); // -> ["a-b-c", "d-e-f-g"]
splitByHyphen("a-b-c-d-e-f-g", 0); // default it is off -> ["a", "b", "c", "d", "e", "f", "g"]
splitByHyphen("a-b-c-d-e-f-g", 99); // -> ["a", "b", "c", "d", "e", "f", "g"]
```

## API

### splitByHyphen(string, titleSplitAt = 0)

## License

MIT © [qaraluch](https://github.com/qaraluch)
