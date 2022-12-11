import { loadLayersModel, tensor } from "@tensorflow/tfjs";
import { start, port } from './server'
import fetch from 'node-fetch';
// @ts-ignore
global.fetch = fetch
const LENGTH = 2

export enum ENCODING {
  'UTF8' = 'UTF8',
  'GBK' = 'GBK'
}

export const detect = async (buf: Buffer) => {
  try {
    const server = await start()
    const model = await loadLayersModel(`http://127.0.0.1:${port}/model.json`);
    server.close()
    let content = Array.from(buf);
    let all = [];
    let count = Math.floor(content.length / LENGTH);
    for (let i = 0; i < count * LENGTH; i += LENGTH) {
      const temp = [];
      for (let j = 0; j < LENGTH; j++) {
        temp.push((255 - content[i + j]) / 50);
      }
      let res: any = model.predict(tensor([temp]));
      res = (res as any).dataSync()
      res = res.toString().split(',').map(n => Number(n))
      all.push(res);
    }

    let rr = [0, 0, 0]
    let r0 = all.reduce((p, c) => {
      return p + c[0]
    }, 0) / all.length
    rr[0] = r0

    let r1 = all.reduce((p, c) => {
      return p + c[1]
    }, 0) / all.length
    rr[1] = r1

    let r2 = all.reduce((p, c) => {
      return p + c[2]
    }, 0) / all.length
    rr[2] = r2

    // console.log(rr)

    return rr[0] > rr[1] ? ENCODING.GBK : ENCODING.UTF8
  } catch (error) {
    // console.log(error)
    throw new Error(error)
  }
}
