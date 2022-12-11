/* eslint-disable unicorn/prefer-string-replace-all */
import { resolve } from 'path'
// import { rollup } from 'rollup'
import glob from 'fast-glob'
import { detect, ENCODING } from '../src/index'
import fs from 'fs'
import path from 'path'
import { describe, it, test, expect } from 'vitest';

describe('transform', () => {
  describe('fixtures', async () => {
    const root = resolve(__dirname, '..')
    // debugger
    const files = await glob('tests/fixtures/*/*.txt', {
      cwd: root,
      onlyFiles: true,
    })
    // console.log(files)
    // debugger

    // for (const file of files.filter((n) => n.endsWith('typescript-global.vue'))) {
    // for (const file of files.filter((n) => n.endsWith('14.vue'))) {
    // for (const file of files.filter((n) => n.endsWith('txt'))) {
    for (const file of files.filter((n) => n.endsWith('utf-8/9.txt'))) {
      it(file.replace(/\\/g, '/'), async () => {
        const filepath = resolve(root, file)
        const type = filepath.includes('ascii') ?
          [ENCODING.GBK, ENCODING.UTF8] :
          (filepath.includes('gbk') ? ENCODING.GBK :
            (filepath.includes('utf-8') ? ENCODING.UTF8 : '')
          )
        // debugger
        try {
          let res = await detect(fs.readFileSync(filepath))
          // if (res !== type) {
          //   debugger
          // }
          if (Array.isArray(type)) {
            expect(type.includes(res)).toBe(true)
          } else {
            expect(res).toBe(type)
          }
          // console.log(filepath)
        } catch (error) {
          console.log(error)
        }
        // const unpluginCode = await getCode(filepath, [
        //   VueImportProps({
        //     configPath: resolve(__dirname, './tsconfig.json')
        //   }),
        //   ToString,
        // ]).catch((err) => err)
        // expect(unpluginCode).toMatchSnapshot()
      })
    }
  })
})
