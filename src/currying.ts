type PartialArray<
  T extends unknown[],
  AllowEmpty extends boolean = true,
  C extends unknown[] = []
> = T extends [
  ...C,
  infer N,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...infer R
]
  ? [...C, N] | PartialArray<T, AllowEmpty, [...C, N]>
  : AllowEmpty extends true
  ? []
  : never;

type UnionToInsection<T> = (T extends T ? (a: T) => 0 : never) extends (
  a: infer R
) => 0
  ? R
  : never;

type Curried<
  FullArgs extends unknown[],
  K,
  BindedArgs extends PartialArray<FullArgs> = [] extends PartialArray<FullArgs>
    ? []
    : never,
  AllowEmpty extends boolean = true,
  DepthCount extends unknown[] = [],
  MaxDepth = FullArgs["length"]
> = UnionToInsection<
  BindedArgs extends FullArgs
    ? () => K
    : FullArgs extends [...BindedArgs, ...infer B]
    ? DepthCount["length"] extends MaxDepth
      ? (...args: B) => K
      : PartialArray<B, AllowEmpty> extends infer BB extends unknown[]
      ? BB extends BB
        ? [...BindedArgs, ...BB] extends PartialArray<FullArgs>
          ? (
              ...args: BB
            ) => FullArgs extends [...BindedArgs, ...BB]
              ? K
              : Curried<
                  FullArgs,
                  K,
                  [...BindedArgs, ...BB],
                  AllowEmpty,
                  [...DepthCount, ""]
                >
          : never
        : never
      : never
    : never
>;

type CC = Curried<[1, "2", true], number>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ff(f: CC) {
  f(1);
  let n: number;
  n = f(1, "2")()()(true);
  n = f(1, "2")()()(true);
  n = f(1, "2", true);
  n = f(1)("2", true);
  n = f(1, "2")(true);
  // @ts-expect-error end fn
  n = f(1, "2")(true)();
  return n;
}

function currying<T extends unknown[], K, Bind extends PartialArray<T>>(
  fn: (...args: T) => K,
  ...bindedArgs: Bind
): Curried<T, K, Bind, false> {
  return function curries(...args: unknown[]) {
    const allArgs = [...bindedArgs, ...args] as const;
    if (allArgs.length >= fn.length) {
      return fn(...(allArgs as unknown as T));
    } else {
      return currying(fn, ...(allArgs as unknown as PartialArray<T>));
    }
  } as Curried<T, K, Bind, false>;
}

function sum(a: number, b: number, c: number, d: number) {
  return a + b + c + d;
}
const a = currying(sum);
a(1)(2);
a(1, 2, 3, 4);
a(1, 2, 3, 4);
a(1, 2, 3);
a(1)(2)(3)(4);
a(1, 2);

console.log(currying(sum)(1)(2)(3)(4));
console.log(currying(sum, 1)(2)(3)(4));
console.log(currying(sum, 1)(2, 3)(4));
console.log(currying(sum)(1)(2, 3)(4));
console.log(currying(sum, 1, 2, 3)(4));
console.log(currying(sum)(1, 2, 3, 4));
console.log(currying(sum)(1, 2, 3));

export {};
