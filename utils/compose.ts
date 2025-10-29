export const compose =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduceRight((acc, fn) => fn(acc), value);

export const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduce((acc, fn) => fn(acc), value);

export const apply =
  <T, R>(fn: (value: T) => R) =>
  (value: T): R =>
    fn(value);

export const curry =
  <T extends (...args: unknown[]) => unknown>(fn: T) =>
  (...args: unknown[]): unknown => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs: unknown[]) => curry(fn)(...args, ...nextArgs);
  };
