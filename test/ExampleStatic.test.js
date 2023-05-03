import ExampleStatic from '../src/ExampleStatic';

test('ExampleStatic Function', () => {
    let random = ExampleStatic.getRandomNumber();
    let flag = typeof random == 'number';
    expect(flag).toBe(true);
});

test('ExampleStatic Dom', () => {
    ExampleStatic.setElementStyle('myDom',{
        color : 'red'
    });
    let color = document.getElementById('myDom').style.color;
    expect(color).toBe('red');
});