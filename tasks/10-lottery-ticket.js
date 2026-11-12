// 10. Lottery Ticket (6 kyu)
// https://www.codewars.com/kata/57f625992f4d53c24200070e

function bingo(ticket, win) {
  let miniWins = 0;

  for (const [str, targetCode] of ticket) {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) === targetCode) {
        miniWins++;
        break;
      }
    }
  }

  return miniWins >= win ? 'Winner!' : 'Loser!';
}
