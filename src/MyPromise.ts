import task from "./microTask";

const PromiseStateSymbol = Symbol("PromiseState");
const PromiseResultSymbol = Symbol("PromiseResult");

enum PromiseStatus {
  PENDDING = "pendding",
  FULLFILLED = "fulfilled",
  REJECTED = "rejected",
}

class MyPromise<ValueType> {
  [PromiseStateSymbol]: PromiseStatus;
  [PromiseResultSymbol]: ValueType | undefined;
  #onFulfilledCallbacks: ((value: ValueType) => void)[];
  #onRejectedCallbacks: ((reason: unknown) => void)[];

  constructor(
    fn: (
      resolve: (value?: ValueType) => void,
      reject: (reason?: unknown) => void
    ) => void
  ) {
    this[PromiseStateSymbol] = PromiseStatus.PENDDING;
    this.#onFulfilledCallbacks = [];
    this.#onRejectedCallbacks = [];

    fn(this.#resolvePromiseX.bind(this), this.#doreject.bind(this));
  }

  #resolvePromiseX(value?: unknown): void {
    if (typeof value === "undefined" || value === null) {
      this.#dofulfill(value as unknown as ValueType);
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
            <T>(reason: T) => {
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
        this.#dofulfill(value as unknown as ValueType);
      }
    } else {
      this.#dofulfill(value as unknown as ValueType);
    }
  }

  #dofulfill(value: ValueType): void {
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

  #doreject(reason: unknown): void {
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

  then(): MyPromise<ValueType>;
  then(onFulfilled: null, onRejected: null): MyPromise<ValueType>;
  then<K>(onFulfilled: (value: ValueType) => K | PromiseLike<K>): MyPromise<K>;
  then<L, R>(
    onFulfilled: null,
    onRejected: (reason: R) => L | PromiseLike<L>
  ): MyPromise<L>;
  then<K, L>(
    onFulfilled: (value: ValueType) => K | PromiseLike<K>,
    onRejected: (reason: unknown) => L | PromiseLike<L>
  ): MyPromise<K | L>;

  then<K, L>(
    onFulfilled?: null | ((value: ValueType) => K | PromiseLike<K>),
    onRejected?: null | ((reason: unknown) => L | PromiseLike<L>)
  ): MyPromise<ValueType | K | L> {
    if (typeof onFulfilled !== "function") {
      onFulfilled = null;
    }
    if (typeof onRejected !== "function") {
      onRejected = null;
    }

    let _resolve: <T extends ValueType | K | L>(value?: T) => void;
    let _reject: <T>(value?: T) => void;

    const newPromise = new MyPromise<ValueType | K | L>((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    const doFulfill = (value: ValueType) => {
      if (onFulfilled === null || typeof onFulfilled === "undefined") {
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

    const doReject = (reason: unknown) => {
      if (onRejected === null || typeof onRejected === "undefined") {
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

    if (this[PromiseStateSymbol] === PromiseStatus.PENDDING) {
      this.#onFulfilledCallbacks.push(doFulfill);
      this.#onRejectedCallbacks.push(doReject);
    } else if (this[PromiseStateSymbol] === PromiseStatus.FULLFILLED) {
      task(() => {
        doFulfill(this[PromiseResultSymbol] as ValueType);
      });
    } else {
      // Promise.reject(e).then(null, (reason) => {})
      task(() => {
        doReject(this[PromiseResultSymbol] as never);
      });
    }
    return newPromise;
  }

  catch<R, T>(onError: (reason: R) => T): MyPromise<T> {
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
  static resolve<T>(value: T): MyPromise<T>;
  static resolve<T>(value?: T): MyPromise<T> {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject<T>(reason?: T): MyPromise<never> {
    return new MyPromise<never>((_resolve, reject) => {
      reject(reason);
    });
  }
}

export default MyPromise;
