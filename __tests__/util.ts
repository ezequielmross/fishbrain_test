import { Request, Response } from 'express'
import imageResize from '../src/jobs/imageResize'
import Bull from 'bull'
import fs from 'fs'
import path from 'path'

const imgDist = path.join(__dirname, '../public/resized/test_img.png')

export function createRequest(req: any) {
  return {
    query: req.query,
    params: req.params,
    body: req.body,
    headers: req.headers
  } as Request
}

export function fakeResponse(cb: Function) {
  const locals = {}
  return {
    locals,
    status: (code: number) => {
      return {
        send(body) {
          cb({ code, body })
          return this
        },
        json(body) {
          cb({ code, body })
          return this
        }
      } as Response<any>
    },
    send(body) {
      cb({ body })
      return this
    },
    json(body) {
      cb({ body })
      return this
    }
  } as Response
}

export async function createResizeImg() {
  await imageResize({
    name: 'testing',
    data: {
      img: '__tests__/static/test_img.png', imgName: 'test_img'
    }
  } as Bull.Job<any>)

  return imgDist
}

export async function deleteResizeImg() {
  fs.unlinkSync(imgDist)
}