import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import typescript from '@rollup/plugin-typescript';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');

const isProduction = !process.env.ROLLUP_WATCH;
const name = 'ReactLottiePlayer';

export default {
  input: './src/index.ts',

  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      name,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      name,
    },
  ],

  plugins: [
    // Remove debugger statements and console.log calls
    isProduction && strip(),

    // Externalize peerDependencies
    peerDepsExternal(),

    // Resolve packages from node_modules
    resolve({ jsnext: true, extensions: ['.ts', '.js', '.tsx'] }),

    // Convert commonjs modules to ES modules
    commonjs(),

    // Use Typescript to transpile code
    typescript({ lib: ['es5', 'es6', 'dom'], target: 'es5' }),

    // In production mode, minify
    isProduction && terser(),

    // Show output filesize
    filesize(),

    // bundle with css files
    postcss({
      extensions: ['.css'],
    }),
  ],
};
