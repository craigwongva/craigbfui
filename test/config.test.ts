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
import * as config from '../src/config'

describe('config', () => {
  it('reads API root URL from environment', () => {
    assert.equal(config.API_ROOT, '/test-api-root')
  })

  it('defines update worker timing properties', () => {
    assert.isNumber(config.UPDATE_WORKER_INTERVAL)
  })

  it('defines at least one basemap tile provider', () => {
    assert.isAbove(config.BASEMAP_TILE_PROVIDERS.length, 0)
  })

  it('defines at least one scene preview tile provider', () => {
    assert.isAbove(config.SCENE_TILE_PROVIDERS.length, 0)
  })

  it('defines at least one tile provider', () => {
    assert.isAbove(config.BASEMAP_TILE_PROVIDERS.length, 0)
  })
})
