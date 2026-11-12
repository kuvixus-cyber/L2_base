// 4. Find the missing term in an Arithmetic Progression (6 kyu)
// https://www.codewars.com/kata/52de553ebb55d1fca3000371

function findMissing(list) {
  // With 1 missing middle term, there are list.length steps between first and last.
  const step = (list[list.length - 1] - list[0]) / list.length;

  for (let i = 0; i < list.length - 1; i++) {
    if (list[i + 1] - list[i] !== step) {
      return list[i] + step;
    }
  }

  return list[0];
}
