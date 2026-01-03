/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
  if (source === null || source === undefined) {
    throw new TypeError('Source array can not be null or undefined');
  }
  const result: R[] = [];
  let index = 0;
  for (const item of source) {
    result.push(mapper(item, index));
    index++;
  }
  return result;
}

export function filterArray<T>(
  source: readonly T[],
  predicate: (item: T, index: number) => boolean
): T[] {
  if (source === null || source === undefined) {
    throw new TypeError('Source array can not be null or undefined');
  }
  let index = 0;
  const result: T[] = [];
  for (const item of source) {
    if (item && predicate(item, index)) {
      result.push(item);
    }
    index++;
  }
  return result;
}

export function reduceArray<T, R>(
  source: readonly T[],
  reducer: (acc: R, item: T, index: number) => R,
  initial: R
): R {
  if (source === null || source === undefined) {
    throw new TypeError('Source array can not be null or undefined');
  }
  let accumulator = initial;
  let index = 0;
  for (let item of source) {
    accumulator = reducer(accumulator, item, index);
    index++;
  }
  return accumulator;
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  if (source === null || source === undefined) {
    throw new TypeError('Source array must not be null or undefined');
  }
  const pass: T[] = [];
  const fail: T[] = [];
  for (let item of source) {
    predicate(item) ? pass.push(item) : fail.push(item);
  }
  return [pass, fail];
}

export function groupBy<T, K extends PropertyKey>(
  source: readonly T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  if (source === null || source === undefined) {
    throw new TypeError('Source array can not be null or undefined');
  }
  const result = {} as Record<K, T[]>;
  for (let item of source) {
    let key = keySelector(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}
const grouped = groupBy(
  [
    { id: 1, tag: 'home' },
    { id: 2, tag: 'work' },
    { id: 3, tag: 'home' },
  ],
  (t) => t.tag
);