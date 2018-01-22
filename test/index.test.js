import test from "ava";
import splitByHyphen from "../dist/index.js";

test("is function", t => {
  const msg = "should be a function ";
  const actual = typeof splitByHyphen === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

test("split by hyphen-minus (default and the most popular)", t => {
  t.deepEqual(splitByHyphen("tere-fere"), ["tere", "fere"]);
  t.deepEqual(splitByHyphen("tere - fere"), ["tere", "fere"]);
  t.deepEqual(splitByHyphen("     tere -      fere      "), ["tere", "fere"]);
});

test("find no hyphens", t => {
  const msg = "should return undefined when find no hyphens in the string";
  t.is(splitByHyphen("tere \u1F384 fere"), undefined, msg);
  t.is(splitByHyphen("tere\u1F384fere"), undefined, msg);
});

test("any kind of hyphen", t => {
  t.deepEqual(
    splitByHyphen("tere - fere"),
    ["tere", "fere"],
    "should split by U+002D	HYPHEN-MINUS"
  );
  t.deepEqual(
    splitByHyphen("tere ‐ fere"),
    ["tere", "fere"],
    "should split by U+2010	HYPHEN"
  );
  t.deepEqual(
    splitByHyphen("tere ‑ fere"),
    ["tere", "fere"],
    "should split by U+2011	NON-BREAKING HYPHEN"
  );
  t.deepEqual(
    splitByHyphen("tere ‒ fere"),
    ["tere", "fere"],
    "should split by U+2012	FIGURE DASH"
  );
  t.deepEqual(
    splitByHyphen("tere – fere"),
    ["tere", "fere"],
    "should split by U+2013	EN DASH"
  );
  t.deepEqual(
    splitByHyphen("tere — fere"),
    ["tere", "fere"],
    "should split by U+2014	EM DASH"
  );
  t.deepEqual(
    splitByHyphen("tere ― fere"),
    ["tere", "fere"],
    "should split by U+2015	HORIZONTAL BAR"
  );
  t.deepEqual(
    splitByHyphen("tere ⸺ fere"),
    ["tere", "fere"],
    "should split by U+2E3A	TWO-EM DASH"
  );
  t.deepEqual(
    splitByHyphen("tere ⸻ fere"),
    ["tere", "fere"],
    "should split by U+2E3B	THREE-EM DASH"
  );
  t.deepEqual(
    splitByHyphen("tere ﹘ fere"),
    ["tere", "fere"],
    "should split by U+FE58	SMALL EM DASH"
  );
  t.deepEqual(
    splitByHyphen("tere ﹣ fere"),
    ["tere", "fere"],
    "should split by U+FE63	SMALL HYPHEN-MINUS"
  );
  t.deepEqual(
    splitByHyphen("tere － fere"),
    ["tere", "fere"],
    "should split by U+FF0D	FULLWIDTH HYPHEN-MINUS"
  );
});

test("hyphenfied string", t => {
  t.deepEqual(
    splitByHyphen("a-b-c-d-e-f-g-"),
    ["a", "b", "c", "d", "e", "f", "g"],
    "should return array of words"
  );
  t.deepEqual(
    splitByHyphen("a-b-c---d-e-f-g-"),
    ["a", "b", "c", "d", "e", "f", "g"],
    "should return array of words"
  );
  t.deepEqual(
    splitByHyphen("a-b-c-d-e-f-g"),
    ["a", "b", "c", "d", "e", "f", "g"],
    "should return array of words"
  );
  t.deepEqual(
    splitByHyphen("a-b‐c‑d‒e–f⸺g"),
    ["a", "b", "c", "d", "e", "f", "g"],
    "should return array of words"
  );
});

test("hyphen at the beginig", t => {
  t.deepEqual(
    splitByHyphen("a-b-c-d-e-f-g"),
    ["a", "b", "c", "d", "e", "f", "g"],
    "should return array of words"
  );
  t.deepEqual(
    splitByHyphen("-a-b-c-d-e-f-g"),
    ["a", "b", "c", "d", "e", "f", "g"],
    "should return array of words"
  );
  t.deepEqual(
    splitByHyphen("--a-b-c-d-e-f-g"),
    ["a", "b", "c", "d", "e", "f", "g"],
    "should return array of words"
  );
});

test("title split", t => {
  const titleSplitAt_Off = 0;
  const titleSplitAt_Default = 1;
  t.deepEqual(
    splitByHyphen("a-b-c-d-e-f-g", titleSplitAt_Off),
    ["a", "b", "c", "d", "e", "f", "g"],
    "should not title split"
  );
  t.deepEqual(
    splitByHyphen("a-b-c-d-e-f-g", titleSplitAt_Default),
    ["a", "b-c-d-e-f-g"],
    "should split in two at first hyphen (default)"
  );
  t.deepEqual(
    splitByHyphen("a-b-c-d-e-f-g", 2),
    ["a-b", "c-d-e-f-g"],
    "should split in two at secound hyphen"
  );
  t.deepEqual(
    splitByHyphen("a-b-c-d-e-f-g", 3),
    ["a-b-c", "d-e-f-g"],
    "should split in two at third hyphen "
  );
  t.deepEqual(
    splitByHyphen("a-b-c-d-e-f-g", 8),
    ["a", "b", "c", "d", "e", "f", "g"],
    "should not title split "
  );
});

// ["a","b","c","d","e","f","g"]
//a
//b
//c
//d
//e
//f
//g

//"a-b‐c‑d‒e–f⸺g"

//-
//‐
//‑
//‒
//–
//—
//―
//⸺
//⸻
//﹘
//﹣
//－

// "\u002D"
// "\u2010"
// "\u2011"
// "\u2012"
// "\u2013"
// "\u2014"
// "\u2015"
// "\u2E3A"
// "\u2E3B"
// "\uFE58"
// "\uFE63"
// "\uFF0D"

// U+002D	HYPHEN-MINUS
// U+2010	HYPHEN
// U+2011	NON-BREAKING HYPHEN
// U+2012	FIGURE DASH
// U+2013	EN DASH
// U+2014	EM DASH
// U+2015	HORIZONTAL BAR
// U+2E3A	TWO-EM DASH
// U+2E3B	THREE-EM DASH
// U+FE58	SMALL EM DASH
// U+FE63	SMALL HYPHEN-MINUS
// U+FF0D	FULLWIDTH HYPHEN-MINUS

// U+002D	HYPHEN-MINUS	(-)
// U+2010	HYPHEN	(‐)
// U+2011	NON-BREAKING HYPHEN	(‑)
// U+2012	FIGURE DASH	(‒)
// U+2013	EN DASH	(–)
// U+2014	EM DASH	(—)
// U+2015	HORIZONTAL BAR	(―)
// U+2E3A	TWO-EM DASH	(⸺)
// U+2E3B	THREE-EM DASH	(⸻)
// U+FE58	SMALL EM DASH	(﹘)
// U+FE63	SMALL HYPHEN-MINUS	(﹣)
// U+FF0D	FULLWIDTH HYPHEN-MINUS	(－)
