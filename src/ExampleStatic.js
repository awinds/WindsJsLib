/**
 * ES6静态类例子
 */
class ExampleStatic {
    /**
     * 生成安全随机数
     * @returns {number}
     */
    static getRandomNumber() {
        let arr = new Uint16Array(1);
        let crypto = window.crypto || window.webkitCrypto || window.mozCrypto || window.oCrypto || window.msCrypto;
        return crypto.getRandomValues(arr)[0];
    }

    /**
     * 给Dom设置样式
     * @param el {DOM | String} dom节点或节点ID
     * @param style {Object} 样式表
     */
    static setElementStyle(el,style) {
         if(typeof el === 'string') {
             el = document.querySelector('#'+el);
         }
         if(typeof style == 'object') {
             for (let s in style) {
                 el.style[s] = style[s];
             }
         }
    }
}

export default ExampleStatic;