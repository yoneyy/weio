/*
 * @Author: Yoneyy (y.tianyuan) 
 * @Date: 2022-10-09 14:35:25 
 * @Last Modified by: Yoneyy (y.tianyuan)
 * @Last Modified time: 2022-10-10 11:39:13
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
 * @param {{input:string; output: typeof import('rollup').OutputOptions,clean: boolean;}} params
 * @returns 
 * @author yoneyy (y.tianyuan)
 */
function buildConfig(params) {

  /** @type {import("rollup").RollupOptions} */
  const config = {
    input: params.input,
    output: params.output,
    plugins: [
      params.clean && cleaner({ targets: 'lib/*' }),
      nodeResolve({
        mainFields: ['module', 'main'],
        extensions: ['.ts', '.d.ts'],
        moduleDirectories: ['node_modules']
      }),
      commonJS(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      IS_PRO_ENV && terser(),
    ].filter(Boolean)
  }

  return config;
};

const buildBaseConfig = { name: 'weio', exports: 'named' };

export default [
  buildConfig({
    clean: true,
    input: resolve('src/weio.ts'),
    output: [
      {
        format: 'cjs',
        file: resolve(`lib/weio.js`),
        ...buildBaseConfig,
      },
      {
        format: 'esm',
        file: resolve(`lib/weio.esm.js`),
        ...buildBaseConfig,
      }
    ]
  }),
  buildConfig({
    input: resolve('src/utils.ts'),
    output: [
      {
        format: 'cjs',
        file: resolve(`lib/utils.js`),
        ...buildBaseConfig,
      },
      {
        format: 'esm',
        file: resolve(`lib/utils.esm.js`),
        ...buildBaseConfig,
      },
    ]
  }),
  buildConfig({
    input: resolve('src/interceptor.ts'),
    output: [
      {
        format: 'cjs',
        file: resolve(`lib/interceptor.js`),
        ...buildBaseConfig,
      },
      {
        format: 'esm',
        file: resolve(`lib/interceptor.esm.js`),
        ...buildBaseConfig,
      },
    ]
  })
];