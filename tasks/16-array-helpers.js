// 16. Array Helpers (6 kyu)
// https://www.codewars.com/kata/525d50d2037b7acd6e000534

Array.prototype.square = function () {
  return this.map((num) => num * num);
};

Array.prototype.cube = function () {
  return this.map((num) => num * num * num);
};

Array.prototype.sum = function () {
  return this.reduce((acc, num) => acc + num, 0);
};

Array.prototype.average = function () {
  if (this.length === 0) {
    return NaN;
  }
  return this.sum() / this.length;
};

Array.prototype.even = function () {
  return this.filter((num) => num % 2 === 0);
};

Array.prototype.odd = function () {
  // Use !== 0 instead of === 1 so negative odd numbers are handled correctly.
  return this.filter((num) => num % 2 !== 0);
};
