import ExampleClass from '../src/ExampleClass';

test('Class ExampleClass', () => {
    let a = 3,b = 4;
    let obj = new ExampleClass({
        base: 100
    });
    let result = obj.getSum(a,b);
    expect(result).toBe(107);
});