import ExampleClass from "./ExampleClass.js";
import ExampleStatic from "./ExampleStatic.js";

//全局
let global = {
    version: '_VERSION_',
    token: ''
};

export default {
    ExampleClass,
    ExampleStatic,
    get token() {
        return global.token;
    },
    set token(token) {
        global.token = token;
    },
    get version() {
        return global.version;
    }
}