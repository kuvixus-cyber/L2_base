// 8. Write Number in Expanded Form (6 kyu)
// https://www.codewars.com/kata/5842df8ccbd22792a4000245

function expandedForm(num) {
  const digits = String(num);
  const parts = [];

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] !== '0') {
      parts.push(digits[i] + '0'.repeat(digits.length - 1 - i));
    }
  }

  return parts.join(' + ');
}
