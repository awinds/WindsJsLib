import Math from '../src/index.js';

test('Class Math', () => {
    let a = 3,b = 4;
    let math = new Math();
    let result = math.sum(a,b);
    expect(result).toBe(7);
});