import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

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
    resolve(),

    // Convert commonjs modules to ES modules
    commonjs(),

    // Use Typescript to transpile code
    typescript(),

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
