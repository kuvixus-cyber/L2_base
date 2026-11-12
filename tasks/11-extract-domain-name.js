// 11. Extract the domain name from a URL (5 kyu)
// https://www.codewars.com/kata/514a024011ea4fb54200004b

function domainName(url) {
  return url
    .replace(/^[a-z]+:\/\//i, '')
    .replace(/^www\./i, '')
    .split('.')[0];
}
