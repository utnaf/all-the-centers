import { uniqWith, isEqual } from "lodash";

function calculateCombinations(list) {
  if (list.length < 3) {
    return [];
  }

  let combinations = [];

  for (let i = 0, max = list.length; i < max; i++) {
    let zeroElemIndex = 0;
    let firstElemIndex = i;
    let secondElemIndex =
      typeof list[i + 1] === "undefined" ? zeroElemIndex++ : i + 1;
    let thirdElemIndex =
      typeof list[i + 2] === "undefined" ? zeroElemIndex : i + 2;

    combinations.push([
      list[firstElemIndex],
      list[secondElemIndex],
      list[thirdElemIndex]
    ]);
  }

  return combinations.concat(calculateCombinations(list.slice(1)));
}

export default function(list) {
  return uniqWith(
    calculateCombinations(list).map(function(item) {
      return item.sort();
    }),
    isEqual
  );
}
