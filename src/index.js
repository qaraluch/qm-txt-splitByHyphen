const hyphenTypes = [
  "\u002D",
  "\u2010",
  "\u2011",
  "\u2012",
  "\u2013",
  "\u2014",
  "\u2015",
  "\u2E3A",
  "\u2E3B",
  "\uFE58",
  "\uFE63",
  "\uFF0D",
];

export default function splitByHyphen(str, titleSplitAt = 0) {
  const ifCharIsH = (ch) => hyphenTypes
    .map(h => ch === h)
    .reduce((acc, cur) => cur === true ? true : acc);
  let positionsH = str.split("")
    .map(char => ifCharIsH(char))
    .map((bool, idx) => bool && idx)
    .filter(bool => bool !== false);

  const filterForTitleSplit = (positionsH, titleSplitAt) => {
    const lgh = positionsH.length;
    return titleSplitAt === 0 ? positionsH :
      (titleSplitAt > 0 && titleSplitAt < lgh) ? positionsH.filter((posNo, idx) => idx === titleSplitAt - 1) :
        positionsH;
  };

  positionsH = filterForTitleSplit(positionsH, titleSplitAt);

  const chunks = str
    .split("")
    .map((char, idx) => positionsH.includes(idx) ? "|" : char)
    .join("")
    .split("|");
  // remove empty strings
  const cleanChunks = chunks.filter(chunk => chunk).map(chunk => chunk.trim());

  return positionsH.length === 0 ? undefined : cleanChunks;
}
