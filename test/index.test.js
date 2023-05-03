import WindsJsLib from '../src/index';

test('Class WindsJsLib', () => {
    WindsJsLib.token = 'ABCDE';
    let version = WindsJsLib.version;
    let token = WindsJsLib.token.toLowerCase();
    expect(token).toBe('abcde');
});