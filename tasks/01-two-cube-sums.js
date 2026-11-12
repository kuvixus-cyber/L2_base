// 1. Two cube sums (6 kyu)
// https://www.codewars.com/kata/55fd4919ce2a1d7c0d0000f3

function hasTwoCubeSums(n) {
  let pairsCount = 0;

  // Enforce a < b so each unordered pair {a, b} is counted once and a !== b.
  // If two distinct pairs satisfy a1^3 + b1^3 = a2^3 + b2^3 with a1 < a2,
  // then b1 > b2 automatically, guaranteeing all four numbers are distinct.
  for (let a = 1; 2 * a * a * a < n; a++) {
    const remainder = n - a * a * a;
    const b = Math.round(Math.cbrt(remainder));

    if (b > a && b * b * b === remainder) {
      pairsCount++;
      if (pairsCount === 2) {
        return true;
      }
    }
  }

  return false;
}
