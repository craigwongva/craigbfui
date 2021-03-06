/**
 * Copyright 2016, RadiantBlue Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import {assert} from 'chai'
import * as sinon from 'sinon'
import * as worker from '../../../src/api/workers/update'
import axios from 'axios'

describe('Update Worker', function () {
  let stubs: Stubs

  this.timeout(100)

  beforeEach(() => {
    stubs = {
      axiosGet: sinon.stub(axios, 'get'),

      // Short circuit async operations
      setInterval:   sinon.stub(window, 'setInterval').returns(-1),
      clearInterval: sinon.stub(window, 'clearInterval').returns(-1),

      // Silence the console logging
      debug: sinon.stub(console, 'debug'),
      error: sinon.stub(console, 'error'),
    }
  })

  afterEach(() => {
    worker.terminate()
    document.documentElement.removeAttribute('data-build')
    stubs.axiosGet.restore()
    stubs.setInterval.restore()
    stubs.clearInterval.restore()
    stubs.debug.restore()
    stubs.error.restore()
  })

  describe('start()', () => {
    it('can start worker instance', () => {
      document.documentElement.setAttribute('data-build', 'test-build-id')
      assert.doesNotThrow(() => {
        worker.start({
          interval:    0,
          onAvailable: sinon.stub(),
        })
      })
    })

    it('honors `interval` configuration', () => {
      const stub = stubs.setInterval
      document.documentElement.setAttribute('data-build', 'test-build-id')
      worker.start({
        interval:    -1234,
        onAvailable: sinon.stub(),
      })
      assert.equal(stub.firstCall.args[1], -1234)
    })

    it('throws if started twice', () => {
      document.documentElement.setAttribute('data-build', 'test-build-id')
      worker.start({
        interval:    0,
        onAvailable: sinon.stub(),
      })
      assert.throws(() => {
        worker.start({
          interval:    0,
          onAvailable: sinon.stub(),
        })
      })
    })

    it('does not begin cycle immediately', () => {
      const stub = stubs.axiosGet
      document.documentElement.setAttribute('data-build', 'test-build-id')
      worker.start({
        interval:    0,
        onAvailable: sinon.stub(),
      })
      assert.isFalse(stub.called)
    })
  })

  describe('work cycle', () => {
    it('handles errors gracefully', () => {
      const stub = stubs.error
      stubs.axiosGet.returns(Promise.reject(new Error('oh noes')))
      worker.start({
        interval:    0,
        onAvailable: sinon.stub(),
      })
      stubs.setInterval.callArg(0)  // Manually invoke tick
      return defer(() => {
        assert.equal(stub.firstCall.args[0], '(update:worker) failed:')
        assert.instanceOf(stub.firstCall.args[1], Error)
      })
    })
  })

  describe('event hook', () => {
    it('fires if updated', () => {
      const stub = sinon.stub()
      stubs.axiosGet.returns(resolveMarkup('test-newer-build-id'))
      document.documentElement.setAttribute('data-build', 'test-build-id')
      worker.start({
        interval:    0,
        onAvailable: stub,
      })
      stubs.setInterval.callArg(0)  // Manually invoke tick
      return defer(() => {
        assert.isTrue(stub.calledOnce)
      })
    })

    it('does not fire if not updated', () => {
      stubs.axiosGet.returns(resolveMarkup())
      const stub = sinon.stub()
      document.documentElement.setAttribute('data-build', 'test-build-id')
      worker.start({
        interval:    0,
        onAvailable: stub,
      })
      stubs.setInterval.callArg(0)  // Manually invoke tick
      return defer(() => {
        assert.isFalse(stub.calledOnce)
      })
    })
  })

  describe('terminate()', () => {
    it('stops worker', () => {
      stubs.setInterval.returns(-1234)
      const stub = stubs.clearInterval
      worker.start({
        interval:    0,
        onAvailable: sinon.stub(),
      })
      worker.terminate()
      assert.equal(stub.callCount, 1)
      assert.isTrue(stub.calledWithExactly(-1234))
    })

    it('does not throw if called when worker is not started', () => {
      assert.doesNotThrow(() => {
        worker.terminate()
      })
    })

    it('can handle gratuitous invocations', () => {
      assert.doesNotThrow(() => {
        worker.terminate()
        worker.terminate()
        worker.terminate()
        worker.terminate()
        worker.terminate()
      })
    })
  })
})

//
// Types
//

interface Stubs {
  axiosGet: Sinon.SinonStub
  setInterval: Sinon.SinonStub
  clearInterval: Sinon.SinonStub
  debug: Sinon.SinonStub
  error: Sinon.SinonStub
}

//
// Helpers
//

function defer(func, delay = 1) {
  return new Promise(resolve => setTimeout(resolve, delay)).then(func)
}

function resolveMarkup(build = 'test-build-id') {
  return Promise.resolve({
    data: new DOMParser().parseFromString(`
        <!doctype html>
        <html lang="en" data-build="${build}">
          <head>
            <title>Beachfront</title>
          </head>
          <body></body>
        </html>
      `.trim(), 'text/html'),
    })
}
