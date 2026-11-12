// 9. Split Strings (6 kyu)
// https://www.codewars.com/kata/515de9ae9dcfc28eb6000001

function solution(str) {
  const pairs = [];

  for (let i = 0; i < str.length; i += 2) {
    pairs.push(str[i] + (str[i + 1] ?? '_'));
  }

  return pairs;
}
