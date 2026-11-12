// 17. Function Cache (5 kyu)
// https://www.codewars.com/kata/525481903700c1a1ff0000e1

function cache(func) {
  const memo = new Map();
  const fnIds = new WeakMap();
  let nextFnId = 0;

  // Custom key serializer keeps undefined, null, strings, and objects distinct.
  function serialize(value) {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'string') return JSON.stringify(value);
    if (typeof value === 'function') {
      if (!fnIds.has(value)) {
        fnIds.set(value, ++nextFnId);
      }
      return `fn:${fnIds.get(value)}`;
    }
    if (typeof value !== 'object') return `${typeof value}:${String(value)}`;
    if (value instanceof Date) return `date:${value.getTime()}`;
    if (value instanceof RegExp) return `regexp:${value.toString()}`;
    if (Array.isArray(value)) {
      return `[${value.map(serialize).join(',')}]`;
    }

    const keys = Object.keys(value).sort();
    return `{${keys.map((k) => `${JSON.stringify(k)}:${serialize(value[k])}`).join(',')}}`;
  }

  return function (...args) {
    const key = serialize(args);
    if (memo.has(key)) {
      return memo.get(key);
    }

    const result = func.apply(this, args);
    memo.set(key, result);
    return result;
  };
}
