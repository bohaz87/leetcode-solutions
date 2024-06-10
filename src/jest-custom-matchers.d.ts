import "jest";

declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
      // toBeFasterThan(expected: number): Promise<R>;
    }
  }
}
