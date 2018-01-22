const hyphenTypes = [
  "\u002D", // U+002D	HYPHEN-MINUS	(-)
  "\u2010", // U+2010	HYPHEN	(‐)
  "\u2011", // U+2011	NON-BREAKING HYPHEN	(‑)
  "\u2012", // U+2012	FIGURE DASH	(‒)
  "\u2013", // U+2013	EN DASH	(–)
  "\u2014", // U+2014	EM DASH	(—)
  "\u2015", // U+2015	HORIZONTAL BAR	(―)
  "\u2E3A", // U+2E3A	TWO-EM DASH	(⸺)
  "\u2E3B", // U+2E3B	THREE-EM DASH	(⸻)
  "\uFE58", // U+FE58	SMALL EM DASH	(﹘)
  "\uFE63", // U+FE63	SMALL HYPHEN-MINUS	(﹣)
  "\uFF0D" // U+FF0D	FULLWIDTH HYPHEN-MINUS	(－)
];

export default function splitByHyphen(str, titleSplitAt = 0) {
  const ifCharIsH = ch =>
    hyphenTypes
      .map(h => ch === h)
      .reduce((acc, cur) => (cur === true ? true : acc));
  let positionsH = str
    .split("")
    .map(char => ifCharIsH(char))
    .map((bool, idx) => bool && idx)
    .filter(bool => bool !== false);

  const filterForTitleSplit = (positionsH, titleSplitAt) => {
    const lgh = positionsH.length;
    return titleSplitAt === 0
      ? positionsH
      : titleSplitAt > 0 && titleSplitAt < lgh
        ? positionsH.filter((posNo, idx) => idx === titleSplitAt - 1)
        : positionsH;
  };

  positionsH = filterForTitleSplit(positionsH, titleSplitAt);

  const breakingChar = "<%break@>"; // not neat :(

  const chunks = str
    .split("")
    .map((char, idx) => (positionsH.includes(idx) ? breakingChar : char))
    .join("")
    .split(breakingChar);

  const cleanChunks = chunks.filter(chunk => chunk).map(chunk => chunk.trim());

  return positionsH.length === 0 ? undefined : cleanChunks;
}
