// 15. T.T.T.33: Grandfather clock (5 kyu)
// https://www.codewars.com/kata/57b06eb0bb9944d42c0001ab

function howManyTimes(time1, time2) {
  const CYCLE_SECONDS = 12 * 3600;
  // 12 + 1 + 2 + ... + 11 = 78 hour strikes + 12 half-hour strikes = 90 per 12h cycle.
  const CHIMES_PER_CYCLE = 90;

  function toUtcSeconds(dateStr) {
    const [datePart, timePart] = dateStr.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);
    const date = new Date(0);
    date.setUTCFullYear(year, month - 1, day);
    date.setUTCHours(hour, minute, second, 0);
    return Math.floor(date.getTime() / 1000);
  }

  function chimesBefore(epochSeconds) {
    const cycles = Math.floor(epochSeconds / CYCLE_SECONDS);
    const rem = epochSeconds - cycles * CYCLE_SECONDS;
    let total = cycles * CHIMES_PER_CYCLE;

    for (let h = 0; h < 12; h++) {
      const hourStart = h * 3600;
      const strikes = h === 0 ? 12 : h;
      const hourOverlap = Math.min(rem, hourStart + strikes) - hourStart;
      if (hourOverlap > 0) {
        total += hourOverlap;
      }
      if (rem > hourStart + 1800) {
        total += 1;
      }
    }

    return total;
  }

  return chimesBefore(toUtcSeconds(time2)) - chimesBefore(toUtcSeconds(time1));
}
