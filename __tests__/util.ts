import { Request, Response } from 'express'

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
