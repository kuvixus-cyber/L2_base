const isNode = typeof require === 'function' && typeof process !== 'undefined';
const log = isNode ? console.log : print;

function loadTask(relPath) {
  if (isNode) {
    const fs = require('fs');
    const path = require('path');
    const vm = require('vm');
    const fullPath = path.resolve(__dirname, '..', relPath);
    vm.runInThisContext(fs.readFileSync(fullPath, 'utf8'), { filename: fullPath });
  } else {
    load(relPath);
  }
}

const TASK_FILES = [
  'tasks/01-two-cube-sums.js',
  'tasks/02-ipv4-parser.js',
  'tasks/03-what-century-is-it.js',
  'tasks/04-find-missing-term.js',
  'tasks/05-primes-in-numbers.js',
  'tasks/06-weird-string-case.js',
  'tasks/07-mexican-wave.js',
  'tasks/08-expanded-form.js',
  'tasks/09-split-strings.js',
  'tasks/10-lottery-ticket.js',
  'tasks/11-extract-domain-name.js',
  'tasks/12-nth-longest-string.js',
  'tasks/13-hex-string-to-rgb.js',
  'tasks/14-circularly-sorted-array.js',
  'tasks/15-grandfather-clock.js',
  'tasks/16-array-helpers.js',
  'tasks/17-function-cache.js',
  'tasks/18-create-phone-number.js',
];

for (const file of TASK_FILES) {
  loadTask(file);
}

function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b || a === null || b === null) return false;
  if (typeof a !== 'object') return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

function formatVal(val) {
  if (val === undefined) return 'undefined';
  if (typeof val === 'number' && Number.isNaN(val)) return 'NaN';
  return JSON.stringify(val);
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (err) {
    failed++;
    log(`FAIL [${name}]: ${err.message}`);
  }
}

function assertEqual(actual, expected, message = '') {
  if (!deepEqual(actual, expected)) {
    throw new Error(
      `${message ? message + ' | ' : ''}Expected ${formatVal(expected)}, got ${formatVal(actual)}`
    );
  }
}

// 1. Two cube sums
test('01 hasTwoCubeSums', () => {
  assertEqual(hasTwoCubeSums(1729), true);
  assertEqual(hasTwoCubeSums(4104), true);
  assertEqual(hasTwoCubeSums(13832), true);
  assertEqual(hasTwoCubeSums(42), false);
  assertEqual(hasTwoCubeSums(9), false);
  assertEqual(hasTwoCubeSums(16), false); // 2^3 + 2^3 uses equal numbers
  assertEqual(hasTwoCubeSums(2), false);  // 1^3 + 1^3 uses equal numbers
  assertEqual(hasTwoCubeSums(1), false);
  assertEqual(hasTwoCubeSums(0), false);
});

// 2. IPv4 Parser
test('02 ipv4Parser', () => {
  assertEqual(ipv4Parser('192.168.2.1', '255.255.255.0'), ['192.168.2.0', '0.0.0.1']);
  assertEqual(ipv4Parser('192.168.50.1', '255.255.255.0'), ['192.168.50.0', '0.0.0.1']);
  assertEqual(ipv4Parser('65.196.188.53', '255.255.240.0'), ['65.196.176.0', '0.0.12.53']);
  assertEqual(ipv4Parser('10.20.30.40', '255.0.0.0'), ['10.0.0.0', '0.20.30.40']);
  assertEqual(ipv4Parser('0.0.0.0', '0.0.0.0'), ['0.0.0.0', '0.0.0.0']);
});

// 3. What century is it?
test('03 whatCentury', () => {
  assertEqual(whatCentury('1999'), '20th');
  assertEqual(whatCentury('2000'), '20th');
  assertEqual(whatCentury('2001'), '21st');
  assertEqual(whatCentury('2011'), '21st');
  assertEqual(whatCentury('2154'), '22nd');
  assertEqual(whatCentury('2259'), '23rd');
  assertEqual(whatCentury('1124'), '12th');
  assertEqual(whatCentury('1001'), '11th');
  assertEqual(whatCentury('1234'), '13th');
  assertEqual(whatCentury('0100'), '1st');
  assertEqual(whatCentury('0001'), '1st');
});

// 4. Find the missing term in an Arithmetic Progression
test('04 findMissing', () => {
  assertEqual(findMissing([1, 3, 5, 9, 11]), 7);
  assertEqual(findMissing([1, 3, 4]), 2);
  assertEqual(findMissing([11, 9, 5, 3, 1]), 7);
  assertEqual(findMissing([-1, -3, -7]), -5);
  assertEqual(findMissing([0, 10, 30]), 20);
  assertEqual(findMissing([5, 5, 5]), 5);
});

// 5. Primes in numbers
test('05 primeFactors', () => {
  assertEqual(primeFactors(86240), '(2**5)(5)(7**2)(11)');
  assertEqual(primeFactors(7775460), '(2**2)(3**3)(5)(7)(11**2)(17)');
  assertEqual(primeFactors(2), '(2)');
  assertEqual(primeFactors(4), '(2**2)');
  assertEqual(primeFactors(7919), '(7919)');
});

// 6. WeIrD StRiNg CaSe
test('06 toWeirdCase', () => {
  assertEqual(toWeirdCase('String'), 'StRiNg');
  assertEqual(toWeirdCase('Weird string case'), 'WeIrD StRiNg CaSe');
  assertEqual(toWeirdCase('This is a test'), 'ThIs Is A TeSt');
  assertEqual(toWeirdCase(''), '');
});

// 7. Mexican Wave
test('07 wave', () => {
  assertEqual(wave('hello'), ['Hello', 'hEllo', 'heLlo', 'helLo', 'hellO']);
  assertEqual(wave(' s p a c e s '), [
    ' S p a c e s ',
    ' s P a c e s ',
    ' s p A c e s ',
    ' s p a C e s ',
    ' s p a c E s ',
    ' s p a c e S ',
  ]);
  assertEqual(wave(''), []);
  assertEqual(wave('   '), []);
});

// 8. Write Number in Expanded Form
test('08 expandedForm', () => {
  assertEqual(expandedForm(12), '10 + 2');
  assertEqual(expandedForm(45), '40 + 5');
  assertEqual(expandedForm(70304), '70000 + 300 + 4');
  assertEqual(expandedForm(9000000), '9000000');
});

// 9. Split Strings
test('09 solution', () => {
  assertEqual(solution('abc'), ['ab', 'c_']);
  assertEqual(solution('abcdef'), ['ab', 'cd', 'ef']);
  assertEqual(solution(''), []);
  assertEqual(solution('a'), ['a_']);
});

// 10. Lottery Ticket
test('10 bingo', () => {
  assertEqual(bingo([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 2), 'Loser!');
  assertEqual(bingo([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 1), 'Winner!');
  assertEqual(bingo([['AAA', 65], ['BBB', 67]], 2), 'Loser!');
  assertEqual(bingo([['ABC', 65], ['XYZ', 89]], 2), 'Winner!');
});

// 11. Extract the domain name from a URL
test('11 domainName', () => {
  assertEqual(domainName('http://github.com/carbonfive/raygun'), 'github');
  assertEqual(domainName('http://www.zombie-bites.com'), 'zombie-bites');
  assertEqual(domainName('https://www.cnet.com'), 'cnet');
  assertEqual(domainName('http://google.co.jp'), 'google');
  assertEqual(domainName('www.xakep.ru'), 'xakep');
  assertEqual(domainName('youtube.com'), 'youtube');
  assertEqual(domainName('https://mywww.com'), 'mywww');
  assertEqual(domainName('http://www.www.com'), 'www');
});

// 12. Find the Nth longest string in an Array
test('12 longest', () => {
  const words = ['Hello', 'World', 'Codewars', 'Katas'];
  assertEqual(longest(words, 3), 'World');
  assertEqual(longest(words, 4), 'Katas');
  assertEqual(longest(words, 1), 'Codewars');
  assertEqual(words, ['Hello', 'World', 'Codewars', 'Katas'], 'must not mutate input');
  assertEqual(longest(['a', 'bb', 'ccc', 'd', 'ee', 'f'], 2), 'bb');
  assertEqual(longest(['a', 'bb', 'ccc', 'd', 'ee', 'f'], 3), 'ee');
});

// 13. Convert A Hex String To RGB
test('13 hexStringToRGB', () => {
  assertEqual(hexStringToRGB('#FF9933'), { r: 255, g: 153, b: 51 });
  assertEqual(hexStringToRGB('#ff9933'), { r: 255, g: 153, b: 51 });
  assertEqual(hexStringToRGB('#000000'), { r: 0, g: 0, b: 0 });
  assertEqual(hexStringToRGB('#Be3a7f'), { r: 190, g: 58, b: 127 });
});

// 14. Circularly Sorted Array
test('14 isCircleSorted', () => {
  assertEqual(isCircleSorted([2, 3, 4, 5, 0, 1]), true);
  assertEqual(isCircleSorted([4, 5, 6, 9, 1]), true);
  assertEqual(isCircleSorted([10, 11, 6, 7, 9]), true);
  assertEqual(isCircleSorted([1, 2, 3, 4, 5]), true);
  assertEqual(isCircleSorted([5, 7, 43, 987, -9, 0]), true);
  assertEqual(isCircleSorted([1, 2, 3, 4, 1]), true);
  assertEqual(isCircleSorted([]), true);
  assertEqual(isCircleSorted([42]), true);
  assertEqual(isCircleSorted([2, 2, 2]), true);
  assertEqual(isCircleSorted([4, 1, 2, 5]), false);
  assertEqual(isCircleSorted([8, 7, 6, 5, 4, 3]), false);
  assertEqual(isCircleSorted([6, 7, 4, 8]), false);
  assertEqual(isCircleSorted([7, 6, 5, 4, 3, 2, 1]), false);
});

// 15. T.T.T.33: Grandfather clock
test('15 howManyTimes', () => {
  assertEqual(howManyTimes('2016-08-14 12:00:00', '2016-08-14 12:00:01'), 1);
  assertEqual(howManyTimes('2016-08-14 12:00:00', '2016-08-14 12:00:11'), 11);
  assertEqual(howManyTimes('2016-08-14 12:00:00', '2016-08-14 12:01:00'), 12);
  assertEqual(howManyTimes('2016-08-14 12:00:00', '2016-08-14 12:30:00'), 12);
  assertEqual(howManyTimes('2016-08-14 12:00:00', '2016-08-14 12:31:00'), 13);
  assertEqual(howManyTimes('2016-08-14 12:00:00', '2016-08-14 13:01:00'), 14);
  assertEqual(howManyTimes('2016-08-14 00:00:00', '2016-08-15 00:00:00'), 180);
  assertEqual(howManyTimes('2016-08-14 12:00:05', '2016-08-14 12:00:10'), 5);
  assertEqual(howManyTimes('2016-08-14 12:30:00', '2016-08-14 12:30:01'), 1);
  assertEqual(howManyTimes('2016-08-14 12:30:01', '2016-08-14 12:31:00'), 0);

  // Brute-force cross-check across a 36-hour window around midnight
  function bruteForce(t1, t2) {
    const parse = (s) => {
      const [d, tm] = s.split(' ');
      const [y, m, day] = d.split('-').map(Number);
      const [hh, mm, ss] = tm.split(':').map(Number);
      return Date.UTC(y, m - 1, day, hh, mm, ss) / 1000;
    };
    const start = parse(t1);
    const end = parse(t2);
    let count = 0;
    for (let t = start; t < end; t++) {
      const secOfDay = ((t % 86400) + 86400) % 86400;
      const hour = Math.floor(secOfDay / 3600) % 12;
      const min = Math.floor((secOfDay % 3600) / 60);
      const sec = secOfDay % 60;
      const strikes = hour === 0 ? 12 : hour;
      if ((min === 0 && sec < strikes) || (min === 30 && sec === 0)) {
        count++;
      }
    }
    return count;
  }

  const spans = [
    ['2016-08-14 23:00:03', '2016-08-15 02:30:01'],
    ['2016-12-31 23:59:50', '2017-01-01 13:00:01'],
    ['2016-02-28 11:00:05', '2016-03-01 00:00:07'],
  ];
  for (const [s1, s2] of spans) {
    assertEqual(howManyTimes(s1, s2), bruteForce(s1, s2), `${s1} -> ${s2}`);
  }
});

// 16. Array Helpers
test('16 Array.prototype helpers', () => {
  const numbers = [1, 2, 3, 4, 5];
  assertEqual(numbers.square(), [1, 4, 9, 16, 25]);
  assertEqual(numbers.cube(), [1, 8, 27, 64, 125]);
  assertEqual(numbers.average(), 3);
  assertEqual(numbers.sum(), 15);
  assertEqual(numbers.even(), [2, 4]);
  assertEqual(numbers.odd(), [1, 3, 5]);
  assertEqual(numbers, [1, 2, 3, 4, 5], 'original array must remain unchanged');

  assertEqual([].sum(), 0);
  assertEqual(Number.isNaN([].average()), true);
  assertEqual([].square(), []);
  assertEqual([-3, -2, -1, 0, 1].odd(), [-3, -1, 1]);
  assertEqual([-3, -2, -1, 0, 1].even(), [-2, 0]);
});

// 17. Function Cache
test('17 cache', () => {
  let calls = 0;
  const complex = cache(function (a, b) {
    calls++;
    if (a === 'retUndef') return undefined;
    return [a, b, calls];
  });

  const r1 = complex('foo', 'bar');
  const r2 = complex('foo', 'bar');
  assertEqual(r1, r2);
  assertEqual(calls, 1);

  complex('foo', 'baz');
  assertEqual(calls, 2);

  // Empty args vs undefined vs null vs 'undefined'
  complex();
  complex();
  assertEqual(calls, 3);

  complex(undefined);
  complex(undefined);
  assertEqual(calls, 4);

  complex(null);
  complex(null);
  assertEqual(calls, 5);

  complex('undefined');
  complex('undefined');
  assertEqual(calls, 6);

  // Cached undefined return value must not re-invoke
  assertEqual(complex('retUndef'), undefined);
  assertEqual(complex('retUndef'), undefined);
  assertEqual(calls, 7);

  // Equivalent object arguments (including differing key order)
  complex({ a: 1, b: 2 });
  complex({ b: 2, a: 1 });
  assertEqual(calls, 8);

  // Distinct function arguments
  const f1 = () => 1;
  const f2 = () => 1;
  complex(f1);
  complex(f1);
  assertEqual(calls, 9);
  complex(f2);
  assertEqual(calls, 10);

  // Preserves `this` context
  const obj = {
    factor: 10,
    compute: cache(function (x) {
      return this.factor * x;
    }),
  };
  assertEqual(obj.compute(3), 30);
});

// 18. Create Phone Number
test('18 createPhoneNumber', () => {
  assertEqual(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]), '(123) 456-7890');
  assertEqual(createPhoneNumber([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), '(111) 111-1111');
});

log(`Passed: ${passed}, Failed: ${failed}`);
if (failed > 0) {
  throw new Error(`${failed} test suite(s) failed`);
}
