// 12. Find the Nth longest string in an Array (6 kyu)
// https://www.codewars.com/kata/5594c4599934000e1e00002e

function longest(arr, n) {
  return arr
    .map((str, index) => ({ str, index }))
    .sort((a, b) => b.str.length - a.str.length || a.index - b.index)[n - 1]
    .str;
}
