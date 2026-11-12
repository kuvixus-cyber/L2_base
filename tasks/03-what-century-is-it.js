// 3. What century is it? (6 kyu)
// https://www.codewars.com/kata/52fb87703c1351ebd200081f

function whatCentury(year) {
  const century = Math.ceil(Number(year) / 100);
  const lastTwoDigits = century % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${century}th`;
  }

  switch (century % 10) {
    case 1:
      return `${century}st`;
    case 2:
      return `${century}nd`;
    case 3:
      return `${century}rd`;
    default:
      return `${century}th`;
  }
}
