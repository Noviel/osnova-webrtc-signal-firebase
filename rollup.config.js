import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'firebase/app',
  'firebase/firestore',
];

export default [
  /*   {
    input: 'src/index.ts',
    output: {
      name: 'webrtc-signal-firebase',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [resolve({ extensions }), commonjs(), typescript()],
  }, */
  {
    input: 'src/index.ts',
    external,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [resolve({ extensions }), typescript()],
  },
];
