/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "promises-aplus-tests" {
  interface PromisesAplusTests {
    (adapter: any, fn: (...args: any[]) => any): void;
    mocha: (adapter: any) => void;
  }
  const promisesAplusTests: PromisesAplusTests;
  export default promisesAplusTests;
}
