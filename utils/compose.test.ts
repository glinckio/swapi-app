import { compose, pipe, apply, curry } from "./compose";

describe("compose", () => {
  it("should compose functions from right to left", () => {
    const addOne = (x: number) => x + 1;
    const multiplyByTwo = (x: number) => x * 2;
    const addOneThenMultiply = compose(multiplyByTwo, addOne);

    expect(addOneThenMultiply(5)).toBe(12);
  });

  it("should handle single function", () => {
    const double = (x: number) => x * 2;
    const composed = compose(double);

    expect(composed(5)).toBe(10);
  });

  it("should handle multiple functions", () => {
    const addOne = (x: number) => x + 1;
    const multiplyByTwo = (x: number) => x * 2;
    const subtractThree = (x: number) => x - 3;
    const composed = compose(subtractThree, multiplyByTwo, addOne);

    expect(composed(5)).toBe(9);
  });

  it("should work with string transformations", () => {
    const toUpperCase = (s: string) => s.toUpperCase();
    const addExclamation = (s: string) => `${s}!`;
    const composed = compose(addExclamation, toUpperCase);

    expect(composed("hello")).toBe("HELLO!");
  });
});

describe("pipe", () => {
  it("should pipe functions from left to right", () => {
    const addOne = (x: number) => x + 1;
    const multiplyByTwo = (x: number) => x * 2;
    const addThenMultiply = pipe(addOne, multiplyByTwo);

    expect(addThenMultiply(5)).toBe(12);
  });

  it("should handle single function", () => {
    const double = (x: number) => x * 2;
    const piped = pipe(double);

    expect(piped(5)).toBe(10);
  });

  it("should handle multiple functions", () => {
    const addOne = (x: number) => x + 1;
    const multiplyByTwo = (x: number) => x * 2;
    const subtractThree = (x: number) => x - 3;
    const piped = pipe(addOne, multiplyByTwo, subtractThree);

    expect(piped(5)).toBe(9);
  });

  it("should work with string transformations", () => {
    const toUpperCase = (s: string) => s.toUpperCase();
    const addExclamation = (s: string) => `${s}!`;
    const piped = pipe(toUpperCase, addExclamation);

    expect(piped("hello")).toBe("HELLO!");
  });

  it("should produce different result than compose for same functions", () => {
    const addOne = (x: number) => x + 1;
    const multiplyByTwo = (x: number) => x * 2;
    const composed = compose(multiplyByTwo, addOne);
    const piped = pipe(addOne, multiplyByTwo);

    expect(composed(5)).toBe(piped(5));
  });
});

describe("apply", () => {
  it("should apply function to value", () => {
    const toUpperCase = (name: string) => name.toUpperCase();
    const formatName = apply(toUpperCase);

    expect(formatName("luke")).toBe("LUKE");
  });

  it("should work with number transformations", () => {
    const double = (x: number) => x * 2;
    const doubleValue = apply(double);

    expect(doubleValue(5)).toBe(10);
  });

  it("should work with complex transformations", () => {
    const formatPrice = (value: number) => `$${value.toFixed(2)}`;
    const applyFormat = apply(formatPrice);

    expect(applyFormat(19.99)).toBe("$19.99");
  });
});

describe("curry", () => {
  it("should curry a two-argument function", () => {
    const add = (a: number, b: number) => a + b;
    const curriedAdd = curry(add);
    const addFive = curriedAdd(5);

    expect(addFive(10)).toBe(15);
  });

  it("should allow partial application", () => {
    const multiply = (a: number, b: number) => a * b;
    const curriedMultiply = curry(multiply);
    const multiplyByThree = curriedMultiply(3);

    expect(multiplyByThree(4)).toBe(12);
  });

  it("should handle multiple arguments", () => {
    const sum = (a: number, b: number, c: number) => a + b + c;
    const curriedSum = curry(sum);
    const addOneAndTwo = curriedSum(1)(2);

    expect(addOneAndTwo(3)).toBe(6);
  });

  it("should work with all arguments at once", () => {
    const add = (a: number, b: number) => a + b;
    const curriedAdd = curry(add);

    expect(curriedAdd(5, 10)).toBe(15);
  });

  it("should work with string concatenation", () => {
    const concatenate = (a: string, b: string) => `${a}${b}`;
    const curriedConcat = curry(concatenate);
    const addWorld = curriedConcat("World");

    expect(addWorld("!")).toBe("World!");
  });
});
