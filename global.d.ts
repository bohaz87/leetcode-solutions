/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "promises-aplus-tests" {
  const promisesAplusTests: (adapter: any, fn: (...args: any[]) => any) => void;
  export default promisesAplusTests;
}
