import promised from '../src'

const target = {
  foo: 'value',
  fun (cb: (error: Error | undefined, result?: string) => void) {
    cb(undefined, this.foo)
  },
  err (cb: (error: Error | undefined, result?: string) => void) {
    cb(new Error(this.foo))
  },
  norm () {
    return this.foo
  },
  normWithFunction(fn: (val: string) => void) {
    fn(this.foo)
  }
}

it('should proxy non-function properties', () => {
  expect(target.foo).toBe('value')
})
it('should promisify methods (resolve)', async () => {
  expect(await promised(target).fun()).toBe('value')
})
it('should promisify methods (reject)', async () => {
  const spy = jest.fn()

  try {
    await promised(target).err()
  } catch (e) {
    spy(e.message)
  }

  expect(spy).toHaveBeenCalledWith('value')
})
it('should not promisify if called with correct arguments', () => {
  expect(promised(target).norm()).toBe('value')
})
it('should not promisify if called with callback', (done) => {
  promised(target).normWithFunction((value: string ) => {
    expect(value).toBe('value')
    done()
  })
})