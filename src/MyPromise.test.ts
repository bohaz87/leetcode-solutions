import MyPromise from "./MyPromise";

MyPromise.resolve(123).then((value) => value.toFixed());
MyPromise.resolve(123).then(() => 456);
MyPromise.resolve().then((val) => val);
MyPromise.resolve(undefined).then((val) => val);
MyPromise.resolve(123)
  .then(() => 456)
  .then((val) => val.toFixed());
MyPromise.resolve("abc").then((value) => value.substring(1));
MyPromise.resolve("abc").then(() => "efc");
MyPromise.resolve("abc")
  .then(() => "efc")
  .then((val) => val.charAt(1))
  .then(() => 123)
  .then((val) => val.toFixed());

MyPromise.reject("abc").then((reason: string) => reason.charAt(1));
MyPromise.reject(123).then((reason: number) => reason.toFixed());

const p = new MyPromise<number>((res, _rej) => {
  res(123);
  // res("123");
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

new Promise<number>((res) => {
  Promise.resolve(123).then(res);
}).then((val: number) => {
  val;
});

const a = Promise.resolve(Promise.resolve(1));
const b = MyPromise.resolve(MyPromise.resolve(1));

// eslint-disable-next-line no-var, @typescript-eslint/no-var-requires
var promisesAplusTests = require("promises-aplus-tests");

const adapter = {
  deferred: deferred,
  resolved: <T>(value: T) => new MyPromise((resolve) => resolve(value)),
  rejected: (reason: unknown) =>
    new MyPromise((resolve, reject) => reject(reason)),
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

promisesAplusTests(adapter, function () {
  // All done; output is in the console. Or check `err` for number of failures.
});
