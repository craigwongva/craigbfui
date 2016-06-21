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

import {Client} from '../utils/piazza-client'
import {GATEWAY} from '../config'

//
// Action Types
//

export const DISCOVER_CATALOG = 'DISCOVER_CATALOG'
export const DISCOVER_CATALOG_SUCCESS = 'DISCOVER_CATALOG_SUCCESS'
export const DISCOVER_CATALOG_ERROR = 'DISCOVER_CATALOG_ERROR'
export const UPDATE_CATALOG_API_KEY = 'UPDATE_CATALOG_API_KEY'

//
// Action Creators
//

export function discoverCatalogIfNeeded() {
  return (dispatch, getState) => {
    if (getState().catalog.url) {
      return
    }
    dispatch(discoverCatalog())
  }
}

export function updateCatalogApiKey(apiKey) {
  return {
    type: UPDATE_CATALOG_API_KEY,
    apiKey
  }
}

function discoverCatalog() {
  return (dispatch, getState) => {
    dispatch({
      type: DISCOVER_CATALOG
    })

    const client = new Client(GATEWAY, getState().authentication.token)
    client.getServices({pattern: '^pzsvc-image-catalog'})
      .then(([catalog]) => {
        if (catalog) {
          dispatch(discoverCatalogSuccess(catalog.url))
        }
        else {
          dispatch(discoverCatalogError('Could not find image catalog service'))
        }
      })
      .catch(err => {
        dispatch(discoverCatalogError(err))
      })
  }
}

function discoverCatalogSuccess(url) {
  return {
    type: DISCOVER_CATALOG_SUCCESS,
    url
  }
}

function discoverCatalogError(err) {
  return {
    type: DISCOVER_CATALOG_ERROR,
    err
  }
}
