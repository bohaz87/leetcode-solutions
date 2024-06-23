/* eslint-disable @typescript-eslint/no-unused-vars */
import MyPromise from "./MyPromise";
import promisesAplusTests from "promises-aplus-tests";

describe(" MyPromise", () => {
  test("syntax", () => {
    MyPromise.resolve(123).then((value) => value.toFixed);
    MyPromise.resolve(123).then((value) => ((value = 456), value));
    MyPromise.resolve().then((val) => ((val = void 0), val));
    MyPromise.resolve(undefined).then((val) => ((val = undefined), val));
    MyPromise.resolve(123)
      .then(() => "456")
      .then((val) => ((val = "123"), val));
    MyPromise.resolve("abc").then((value) => value.substring(1));
    MyPromise.resolve("abc").then(() => "efc");
    MyPromise.resolve("abc")
      .then(() => "efc")
      .then((val) => val.charAt(1))
      .then(() => 123)
      .then((val) => val.toFixed());

    MyPromise.reject("abc")
      .catch((reason: string) => reason.charCodeAt(1))
      .then();
    MyPromise.reject(123).catch((reason: number) => reason.toFixed());
    MyPromise.reject(new Error("abc"))
      .catch((reason: Error) => reason.message)
      .then((v) => v.charAt);

    const p = new MyPromise<number>((res, _rej) => {
      res(123);
    });

    p.then((value) => {
      value.toFixed();
      return true;
    })
      .then(
        (value) => value.valueOf(),
        () => {
          return false;
        }
      )
      .then(
        () => {
          return 123;
        },
        () => "123"
      )
      .then((val) => {
        val;
      });

    new MyPromise<number>((res) => {
      MyPromise.resolve(123).then(res);
    }).then((val) => {
      val;
    });

    new MyPromise<void>((res) => {
      MyPromise.resolve(123).then(() => res());
    }).then((val) => {
      val;
    });

    new MyPromise<undefined>((res) => {
      MyPromise.resolve(123).then(() => res());
    }).then((val) => {
      val;
    });

    new MyPromise<undefined>((_, rej) => {
      MyPromise.resolve(123).then(() => rej());
    }).then((val) => {
      val;
    });

    new Promise<number>((res) => {
      Promise.resolve(123).then(res);
    }).then((val: number) => {
      val;
    });

    Promise.resolve(Promise.resolve(1));
    MyPromise.resolve(MyPromise.resolve(1));

    MyPromise.resolve();
  });
});

const adapter = {
  deferred: deferred,
  resolved: <T>(value: T) => new MyPromise((resolve) => resolve(value)),
  rejected: (reason: unknown) => new MyPromise((_, reject) => reject(reason)),
};

function deferred<T>() {
  const pending = {} as {
    promise: MyPromise<T>;
    resolve: (value: T) => void;
    reject: (reason: unknown) => void;
  };
  pending.promise = new MyPromise((resolve, reject) => {
    pending.resolve = resolve;
    pending.reject = reject;
  });
  return pending;
}

describe("Promises/A+ Tests", function () {
  test("Pormise A+", (done) => {
    promisesAplusTests(adapter, function (_err) {
      // All done; output is in the console. Or check `err` for number of failures.
      done();
    });
  });
});
