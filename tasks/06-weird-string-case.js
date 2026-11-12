// 6. WeIrD StRiNg CaSe (6 kyu)
// https://www.codewars.com/kata/52b757663a95b11b3d00062d

function toWeirdCase(string) {
  return string
    .split(' ')
    .map((word) =>
      word
        .split('')
        .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
        .join('')
    )
    .join(' ');
}
