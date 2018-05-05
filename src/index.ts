import { CustomPromisify } from 'util'

export type FunctionProxy<T extends Function> = CustomPromisify<T>

export type PackageProxy<P extends { [key: string]: Function }> = {
  [K in keyof P]: FunctionProxy<P[K]>
}

export default function promised<T extends { [key: string]: Function | any }>(target: T): PackageProxy<T> {
  return new Proxy(target, {
    get(target: T, key: string): any {
      const value: any = target[key]

      if (typeof value === 'function') {
        return promisedFunction(value)
      }

      return value
    }
  })
}

function promisedFunction<T extends Function>(fn: T): CustomPromisify<T> | T {
  return new Proxy(fn, {
    apply(target, _this, args) {
      if (target.length > args.length) {
        return promisify(fn).apply(_this, args)
      }

      return fn.apply(_this, args)
    }
  })
}

function promisify(fn: Function): Function {
  try {
    return require('util').promisify(fn)
  } catch (e) {
    return function (...args: any[]) {
      return new Promise((resolve, reject) => {
        try {
          fn.call(this, ...args, (error: Error | undefined | null, ...values: any[]) => {
            if (error) reject(error)
            else if (values.length > 1) {
              resolve(values)
            } else {
              resolve(values[0])
            }
          })
        } catch(e) {
          reject(e)
        }
      })
    }
  }
}