 # WindsJsLib  
在开发JsLib的过程中遇到了一些问题，包括ES6的打包，调试，代码检查，单元测试，Worker线程，Sonar发布等等，希望此示例工程能帮助一些人少走弯路。

##使用
开始：  
```npm
npm install
```
运行：   
```npm
npm run start
```
说明run的几种：
> npm run dev 开发模式，访问http://127.0.0.1:10001/ 动态更新加载  
> npm run build 编译发布，发布jslib到dist  
> npm run start 同npm run dev  
> npm run test 单元测试，运行test文件名中包含test的js文件  
> npm run coverage 单元测试并生成覆盖率到coverage目录  
> npm run docs 生成接口文档，目录docs/WindsJsLib/{版本号}/  

##问题插件修复 
> - rollup-plugin-web-worker-loader v1.6.1
>> 1、修改`preserveSource: true`下压缩后报`Cannot read property 'search' of undefined`的问题  
   找到文件：`/node_modules/rollup-plugin-web-worker-loader/src/helper/funcToSource.js`  
>>```
>>var source = fn.toString();  
>>var lines = source.split('\n');  
>>lines.pop();  
>>lines.shift();  
>>var blankPrefixLength = lines[0].search(/\S/);  
>>var regex = /(['"])__worker_loader_strict__(['"])/g;  
>>for (var i = 0, n = lines.length; i < n; ++i) {  
>>  lines[i] = lines[i].substring(blankPrefixLength).replace(regex, '$1use strict$2') + '\n';  
>>}  
>>```
>>修改为
>>```
>>var lines = [];  
>>var source = fn.toString();  
>>var regex = /(['"])__worker_loader_strict__(['"])/g;  
>>source = source.replace(regex, '$1use strict$2');  
>>lines.push('(' + source + ')()');  
>>```
>>2、修改`enableUnicode: true`后base64文件过大时decodeBase64报Maximum call stack size exceeded的问题  
     找到文件：`/node_modules/rollup-plugin-web-worker-loader/src/helper/browser/createBase64WorkerFactory.js`  
  >>```
  >>return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
  >>```
  >>修改为
  >>```
  >>const decoder = new TextDecoder("utf-16le");  
  >>return decoder.decode(new Uint16Array(binaryView.buffer));  
  >>```
  >>
>
> - jsdoc v4.0.0 
>> 1、JSdoc @module 中文跳转路径错误修复  
   文件：`node_modules/jsdoc/lib/jsdoc/util/templateHelper.js` 第353行
>>```
>>return util.format('<a href="%s"%s>%s</a>', encodeURI(fileUrl + fragmentString),
>>            classString, text);
>>```
>>修改为
>>```
>>return util.format('<a href="%s"%s>%s</a>', encodeURI(fileUrl + fragmentString).replace(/%2525/g,"%25"),
>>            classString, text);
>>```

##目录说明  
```
|-- WindsJsLib  
    |-- .babelrc                babel配置文件  
    |-- .eslintrc               eslint配置文件  
    |-- jest.config.js          单元测试jest配置文件  
    |-- package.json            项目配置  
    |-- README.md               项目说明  
    |-- rollup.config.js        Rollup打包编译发布配置  
    |-- jsdoc.json              JsDoc发布配置
    |-- dist                    发布目录  
    |-- docs                    文档目录   
    |-- assets                  静态资源目录  
    |-- src                     源文件目录  
    |   |-- index.js            主JS文件  
    |   |-- dom                 示例dom开发代码  
    |   |-- math                示例math开发代码
    |   |-- worker              Worker文件，文件名规则"线程名.worker.js"  
    |-- test                    单元测试目录，文件名规则"测试名.test.js" 
```