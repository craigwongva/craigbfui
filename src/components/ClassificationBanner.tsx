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

const styles: any = require('./ClassificationBanner.css')

import * as React from 'react'
import {
  CLASSIFICATION_BANNER_BACKGROUND,
  CLASSIFICATION_BANNER_FOREGROUND,
  CLASSIFICATION_BANNER_TEXT,
} from '../config'

interface Props {
  anchor: 'top'|'bottom'
}

export const ClassificationBanner = ({ anchor }: Props) => (
  <div
    className={styles.root}
   style={{
    [anchor]: 0,
    backgroundColor: CLASSIFICATION_BANNER_BACKGROUND,
    color: CLASSIFICATION_BANNER_FOREGROUND,
  }}>
    {CLASSIFICATION_BANNER_TEXT}
  </div>
)
