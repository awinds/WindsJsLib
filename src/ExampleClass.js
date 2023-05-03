/**
 * ES6类例子
 */
class ExampleClass {

    /**
     * 构造函数
     * @param options {Object}
     * @param options.base {Number} 基数
     */
    constructor(options) {
        this._options = {
            base : 10
        };
        this._options = Object.assign(this._options,options);
    }

    /**
     * 相加
     * @param a {Number} 加数1
     * @param b {Number} 加数2
     * @return {Number} 结果
     */
    getSum(a,b) {
        return a+b + this._options.base;
    }

}

export default ExampleClass;