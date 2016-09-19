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

export function extractAlgorithmUrl({ svcUrl, svcURL }) {
  if (!svcUrl && !svcURL) {
    throw new Error('missing algorithm URL')
  }
  return svcUrl || svcURL
}

export function extractDateCreated({ dateCreated }) {
  const date = dateCreated ? new Date(dateCreated) : new Date()
  if (isNaN(date.getTime())) {
    throw new Error('invalid date created')
  }
  return date.toISOString()
}

export function extractGeometry({ geometry }) {
  if (!geometry) {
    throw new Error('missing geometry')
  }
  if (geometry.type !== 'Polygon') {
    throw new Error(`invalid geometry type: '${geometry.type}'`)
  }
  if (!Array.isArray(geometry.coordinates)) {
    throw new Error('invalid geometry coordinates')
  }
  return geometry
}

export function extractGeojsonDataId({ shoreDataID }) {
  if (!shoreDataID) {
    throw new Error('missing geojson data ID')
  }
  return shoreDataID
}

export function extractGeojsonDeploymentId({ shoreDeplID }) {
  if (!shoreDeplID) {
    throw new Error('missing geojson deployment ID')
  }
  return shoreDeplID
}

export function extractSceneCaptureDate({ sceneCaptureDate }) {
  if (!sceneCaptureDate) {
    throw new Error('missing image capture date')
  }
  const date = new Date(sceneCaptureDate)
  if (isNaN(date.getTime())) {
    throw new Error(`invalid image capture date '${sceneCaptureDate}'`)
  }
  return sceneCaptureDate
}

export function extractSceneId({ sceneId }) {
  if (!sceneId) {
    throw new Error('missing scene ID')
  }
  return sceneId
}

export function extractSensorName({ sensorName }) {
  if (!sensorName) {
    throw new Error('missing sensor name')
  }
  return sensorName
}

export function extractName({ jobName }) {
  return jobName || `Imported(${Math.random().toString(16).substr(2, 5)})`
}

export function parseString(outputString) {
  try {
    return JSON.parse(outputString)
  }
  catch (_) {
    throw new Error('execution output could not be parsed')
  }
}