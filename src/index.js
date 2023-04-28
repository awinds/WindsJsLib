import Math from "./math/math.js";
import Dom from "./dom/dom.js";

//全局版本号
const version = '_VERSION_';
const token = '';

export default {
    Math,
    Dom,
    get token() {
        return token;
    },
    set token(token) {
        token = token;
    },
    get version() {
        return version;
    }
}