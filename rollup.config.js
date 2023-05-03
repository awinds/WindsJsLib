import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import eslint from '@rollup/plugin-eslint';
import replace from '@rollup/plugin-replace';
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * © 2022-${new Date().getFullYear()} ${pkg.author}
 * ${pkg.description}
 * ${pkg.contributors.join(';')}
 * Released under the ${pkg.license} License.
 */
`;

//开发环境
const isDev = process.env.BUILD === 'dev';

const output = [{
    name: pkg.name,
    banner,
    file: './dist/windsjslib.js',
    format: 'umd',
    sourcemap: true,
    globals: {}
},
{
    name: pkg.name,
    banner,
    file: './dist/windsjslib.min.js',
    format: 'umd',
    plugins: [terser({
        compress: {
            drop_console: true
        }
    })],
    sourcemap: false,
    globals: {}
}];

isDev && output.pop();

export default {
    input: './src/index.js',
    output: output,
    onwarn: function (warning, warn) {
        if (warning.code === 'THIS_IS_UNDEFINED' || warning.code === 'UNKNOWN_OPTION') {
            return;
        }
        if (warning.code ===  'EVAL' && /Use of eval is strongly discouraged/.test(warning.message) && /crunch.js/.test(warning.id)) {
            return;
        }
        warn(warning);
    },
    plugins: [
        replace({
            preventAssignment:true,
            _VERSION_: pkg.version,
            _RELEASE_: 'release'
        }),
        eslint({
            throwOnError: true,
            throwOnWarning: true,
            include: ['src/**'],
            exclude: ['node_modules/**','assets/**']
        }),
        resolve(),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
        }),
        commonjs(),
        webWorkerLoader({
            targetPlatform: 'browser',
            pattern: /.*\w+\.worker\.js/,
            preserveSource: true,
            enableUnicode: true, //支持中文
            plugins: [
                !isDev && terser({
                    compress: {
                        drop_console: true
                    }})
            ]
        }),
        isDev && serve({
            port: 10001,
        }),
        isDev && livereload({
            watch:'dist'
        })
    ],
    globals: {},
    external: [],
};