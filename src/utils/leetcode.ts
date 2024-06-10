const leetcode = {
  test(names: any[], args: any[], results: any[]) {
    describe(names[0], () => {
      const instance = new (names[0] as any)(...(args[0] as any[]));

      for (let i = 1; i < names.length; i++) {
        test(`case ${i}: ${String(names[i])}(${args[i].join(",")})`, () => {
          const ret = (instance as any)[names[i]](...args[i]);
          expect(ret).toEqual(results[i]);
        });
      }
    });
  },
};

export default leetcode;
