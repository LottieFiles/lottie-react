import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const packageJson = require('./package.json');

export default {
  input: './src/index.ts',

  output: [
    {
      file: packageJson.main,
      name: 'LottiePlayer',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      name: 'LottiePlayer',
      format: 'esm',
      sourcemap: true,
    },
  ],

  plugins: [
    // Remove debugger statements and console.log calls
    !process.env.ROLLUP_WATCH && strip(),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    terser(),
  ],
};
