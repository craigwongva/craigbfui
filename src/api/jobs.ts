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

import {Promise} from 'axios'
import {getClient} from './session'

interface ParamsCreateJob {
  algorithmId: string
  name: string
  catalogApiKey: string
  sceneId: string
}

export function createJob({
  algorithmId,
  name,
  catalogApiKey,
  sceneId,
}: ParamsCreateJob): Promise<beachfront.Job> {
  return getClient().post('/v0/job', {
    algorithm_id:   algorithmId,
    name:           name,
    planet_api_key: catalogApiKey,
    scene_id:       sceneId,
  })
    .then(response => response.data.job)
    .catch(err => {
      console.error('(jobs:create) could not execute:', err)
      throw err
    })
}

export function forgetJob(jobId: string) {
  return getClient().delete(`/v0/job/${jobId}`)
}

export function fetchJobs(): Promise<beachfront.Job[]> {
  return getClient().get('/v0/job')
    .then(
      response => response.data.jobs.features,
      err => {
        console.error('(jobs:fetchJobs) failed:', err)
        throw err
      },
    )
}

export function fetchJob(jobId: string): Promise<beachfront.Job> {
  return getClient().get(`/v0/job/${jobId}`)
    .then(
      response => response.data.job,
      err => {
        console.error('(jobs:fetchJob) failed:', err)
        throw err
      },
    )
}
