import task from "./microTask";

const PromiseStateSymbol = Symbol("PromiseState");
const PromiseResultSymbol = Symbol("PromiseResult");

enum PromiseStatus {
  PENDDING = "pendding",
  FULLFILLED = "fulfilled",
  REJECTED = "rejected",
}

type resolver<T> = (value?: T) => void;
type rejector = (reason?: unknown) => void;

type Wait<T> = T extends null | undefined
  ? T
  : T extends PromiseLike<infer K>
  ? K
  : T;

type PromiseLike<T> =
  | MyPromise<T>
  | Promise<T>
  | {
      then: (res: (value?: T) => void, rej: (reason?: unknown) => void) => void;
    };

export default class MyPromise<T> {
  [PromiseStateSymbol]: PromiseStatus;
  [PromiseResultSymbol]: T | undefined;
  #onFulfilledCallbacks: ((value: T) => void)[];
  #onRejectedCallbacks: rejector[];

  constructor(fn: (resolve: resolver<T>, reject: rejector) => void) {
    this[PromiseStateSymbol] = PromiseStatus.PENDDING;
    this.#onFulfilledCallbacks = [];
    this.#onRejectedCallbacks = [];

    fn(this.#resolvePromiseX.bind(this), this.#doreject.bind(this));
  }

  #resolvePromiseX(value?: unknown): void {
    if (typeof value === "undefined" || value === null) {
      this.#dofulfill(value as unknown as T);
    } else if (value instanceof MyPromise) {
      if (value === this) {
        throw new TypeError(
          "Type error, should not resolve with the promise itself."
        );
      }
      switch (value[PromiseStateSymbol]) {
        case PromiseStatus.PENDDING:
          // value.then(this.#dofulfill.bind(this), this.#doreject.bind(this));
          value.#onFulfilledCallbacks.push(this.#dofulfill.bind(this));
          value.#onRejectedCallbacks.push(this.#doreject.bind(this));
          break;
        case PromiseStatus.FULLFILLED:
          this.#dofulfill(value[PromiseResultSymbol]);
          break;
        case PromiseStatus.REJECTED:
          this.#doreject(value[PromiseResultSymbol]);
          break;
        default:
      }
    } else if (typeof value === "function" || typeof value === "object") {
      let then;
      let called = false;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        then = (value as any).then;
      } catch (e) {
        this.#doreject(e);
      }
      if (typeof then === "function") {
        try {
          then.call(
            value,
            (y: unknown) => {
              if (!called) {
                called = true;
                this.#resolvePromiseX(y);
              }
            },
            (reason: unknown) => {
              if (!called) {
                called = true;
                this.#doreject(reason);
              }
            }
          );
        } catch (error) {
          if (!called) {
            this.#doreject(error);
          }
        }
      } else {
        this.#dofulfill(value as unknown as T);
      }
    } else {
      this.#dofulfill(value as unknown as T);
    }
  }

  #dofulfill(value: T): void {
    if (this[PromiseStateSymbol] !== PromiseStatus.PENDDING) {
      // console.warn("promise already %s", this[PromiseStateSymbol]);
      return;
    }

    this[PromiseStateSymbol] = PromiseStatus.FULLFILLED;
    this[PromiseResultSymbol] = value;
    task(() => {
      this.#onFulfilledCallbacks.forEach((fn) => fn(value));
    });
    Object.freeze(this);
  }

  #doreject(reason?: unknown): void {
    if (this[PromiseStateSymbol] !== PromiseStatus.PENDDING) {
      // console.warn("promise already %s", this[PromiseStateSymbol]);
      return;
    }

    this[PromiseStateSymbol] = PromiseStatus.REJECTED;
    this[PromiseResultSymbol] = reason as never;
    task(() => {
      if (
        this.#onFulfilledCallbacks.length === 0 &&
        this[PromiseStateSymbol] === PromiseStatus.REJECTED
      ) {
        // throw "unhandled promise rejection: " + this[PromiseResultSymbol];
        // console.warn(
        //   "unhandled promise rejection: ",
        //   this[PromiseResultSymbol]
        // );
      }

      this.#onRejectedCallbacks.forEach((fn) => fn(reason));
    });
    Object.freeze(this);
  }

  then(): MyPromise<T>;
  then(
    onFulfilled: null | undefined,
    onRejected?: null | undefined
  ): MyPromise<T>;
  then<K>(onFulfilled: (value: T) => K | PromiseLike<K>): MyPromise<K>;
  then<L>(
    onFulfilled: null | undefined,
    onRejected: (reason: unknown) => L | PromiseLike<L>
  ): MyPromise<L>;
  then<K, L>(
    onFulfilled: (value: T) => K | PromiseLike<K>,
    onRejected: (reason: unknown) => L | PromiseLike<L>
  ): MyPromise<K | L>;

  then<K, L>(
    onFulfilled?: null | ((value: T) => K | PromiseLike<K>),
    onRejected?: null | ((reason: unknown) => L | PromiseLike<L>)
  ): MyPromise<T | K | L> {
    if (typeof onFulfilled !== "function") {
      onFulfilled = undefined;
    }
    if (typeof onRejected !== "function") {
      onRejected = undefined;
    }

    let _resolve: resolver<T | K | L>;
    let _reject: rejector;

    const newPromise = new MyPromise<T | K | L>(
      (resolve: resolver<T | K | L>, reject: rejector) => {
        _resolve = resolve;
        _reject = reject;
      }
    );

    const doFulfill = (value: T) => {
      if (!onFulfilled) {
        _resolve(value);
        return;
      }
      try {
        const newValue = onFulfilled(value);
        newPromise.#resolvePromiseX(newValue);
      } catch (e) {
        _reject(e as never);
      }
    };

    const doReject: rejector = (reason?: unknown) => {
      if (!onRejected) {
        _reject(reason);
        return;
      }
      try {
        const newValue = onRejected(reason);
        newPromise.#resolvePromiseX(newValue);
      } catch (e) {
        _reject(e as never);
      }
    };

    // const p1 = new Promise()
    // p1.then(onFulfilled, onRejected)
    if (this[PromiseStateSymbol] === PromiseStatus.PENDDING) {
      // this.then(doFulfill, doReject);
      this.#onFulfilledCallbacks.push(doFulfill);
      this.#onRejectedCallbacks.push(doReject);
    }
    // const p1 = Promise.resolve()
    // await p1
    // p1.then(onFulfilled, onRejected)
    else if (this[PromiseStateSymbol] === PromiseStatus.FULLFILLED) {
      task(() => {
        doFulfill(this[PromiseResultSymbol] as T);
      });
    }
    // const p1 = Promise.reject()
    // await p1
    // p1.then(onFulfilled, onRejected)
    else {
      task(() => {
        doReject(this[PromiseResultSymbol]);
      });
    }
    return newPromise;
  }

  catch<K>(onError: (reason: unknown) => K): MyPromise<K> {
    return this.then(null, onError);
  }

  // static resolve<K = undefined>(): (value: K) => MyPromise<void>;
  // static resolve<K>(): (value: K) => MyPromise<K>;
  /**
   * Creates a new resolved promise.
   * @returns A resolved promise.
   */
  static resolve(): MyPromise<void>;
  /**
   * Creates a new resolved promise for the provided value.
   * @param value A promise.
   * @returns A promise whose internal state matches the provided promise.
   */
  static resolve<T>(value: T): MyPromise<Wait<T>>;
  static resolve<T>(value?: T): MyPromise<T> {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason?: unknown): MyPromise<never> {
    return new MyPromise<never>((_resolve, reject) => {
      reject(reason);
    });
  }
}
