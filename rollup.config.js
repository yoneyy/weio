/*
 * @Author: Yoneyy (y.tianyuan) 
 * @Date: 2022-10-09 14:35:25 
 * @Last Modified by: Yoneyy (y.tianyuan)
 * @Last Modified time: 2022-10-09 18:38:38
 */

import path from 'path';
import cleaner from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import commonJS from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';

const resolve = p => path.resolve(__dirname, p);
const IS_PRO_ENV = process.env.NODE_ENV === 'production';

/**
 * buildConfig
 * generate rollup build config
 * 
 * @returns 
 * @author yoneyy (y.tianyuan)
 */
function buildConfig() {

  const input = resolve('src/weio.ts');
  const outFile = resolve(`lib/weio.js`);
  const outESMFile = resolve(`lib/weio.esm.mjs`);

  /** @type {import("rollup").RollupOptions} */
  const config = {
    input,
    output: [
      {
        name: 'weio',
        format: 'umd',
        file: outFile,
        exports: 'named'
      },
      {
        format: 'esm',
        file: outESMFile,
        exports: 'named'
      }
    ],
    plugins: [
      cleaner({ targets: 'lib/*' }),
      nodeResolve({
        mainFields: ['module', 'main'],
        extensions: ['.ts', '.d.ts'],
        moduleDirectories: ['node_modules']
      }),
      commonJS(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      IS_PRO_ENV && terser(),
    ].filter(Boolean)
  }

  return config;
};

export default [
  buildConfig()
];