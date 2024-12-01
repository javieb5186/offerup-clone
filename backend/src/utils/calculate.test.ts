test("calculates the sum of two numbers", () => {
  const calculateSum = (a: number, b: number) => a + b;
  expect(calculateSum(2, 3)).toBe(5);
});
