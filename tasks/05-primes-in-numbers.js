// 5. Primes in numbers (5 kyu)
// https://www.codewars.com/kata/54d512e62a5e54c96200019e

function primeFactors(n) {
  let result = '';
  let value = n;

  for (let divisor = 2; divisor * divisor <= value; divisor += divisor === 2 ? 1 : 2) {
    let count = 0;
    while (value % divisor === 0) {
      value /= divisor;
      count++;
    }
    if (count > 0) {
      result += count === 1 ? `(${divisor})` : `(${divisor}**${count})`;
    }
  }

  if (value > 1) {
    result += `(${value})`;
  }

  return result;
}
