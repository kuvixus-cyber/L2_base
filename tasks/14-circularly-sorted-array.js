// 14. Circularly Sorted Array (6 kyu)
// https://www.codewars.com/kata/544975fc18f47481ba00107b

function isCircleSorted(arr) {
  let drops = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[(i + 1) % arr.length]) {
      drops++;
      if (drops > 1) {
        return false;
      }
    }
  }

  return true;
}
