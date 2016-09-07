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

const styles = require('./ProductLine.css')

import React from 'react'
import moment from 'moment'
import {ActivityTable} from './ActivityTable'

import {
  KEY_ALGORITHM_NAME,
  KEY_CREATED_ON,
  KEY_EXPIRES_ON,
  KEY_IMAGE_CLOUDCOVER,
  KEY_NAME,
  KEY_OWNER,
  KEY_SPATIAL_FILTER_NAME,
  KEY_STARTS_ON,
} from '../constants'

const LAST_24_HOURS = {value: 'PT24H', label: 'Last 24 Hours'}
const LAST_7_DAYS = {value: 'P7D', label: 'Last 7 Days'}
const LAST_30_DAYS = {value: 'P30D', label: 'Last 30 Days'}
const SINCE_CREATION = {value: 'P0D', label: 'All'}

export class ProductLine extends React.Component {
  static propTypes = {
    className:     React.PropTypes.string,
    productLine:   React.PropTypes.object.isRequired,
    sessionToken:  React.PropTypes.string,
    onFetchJobs:   React.PropTypes.func.isRequired,
    onJobHoverIn:  React.PropTypes.func.isRequired,
    onJobHoverOut: React.PropTypes.func.isRequired,
    onJobSelect:   React.PropTypes.func.isRequired,
    onJobDeselect: React.PropTypes.func.isRequired,
    onPanTo:       React.PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      duration: LAST_24_HOURS.value,
      error: null,
      isExpanded: false,
      isFetchingJobs: false,
      selectedJobs: [],
      jobs: [],
    }
    this._handleDurationChange = this._handleDurationChange.bind(this)
    this._handleExpansionToggle = this._handleExpansionToggle.bind(this)
    this._handleJobRowClick = this._handleJobRowClick.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isExpanded && (prevState.isExpanded !== this.state.isExpanded || prevState.duration !== this.state.duration)) {
      this._fetchJobs()
    }
    if (prevState.isExpanded && !this.state.isExpanded && this.state.selectedJobs.length) {
      this.props.onJobDeselect()
    }
  }

  render() {
    const {className, productLine} = this.props
    const {properties} = productLine
    const {isExpanded, duration} = this.state
    return (
      <li className={`${styles.root} ${className || ''} ${isExpanded ? styles.isExpanded : ''}`}>
        <section className={styles.header} onClick={this._handleExpansionToggle}>
          <h3 className={styles.title}>
            <i className={`fa fa-chevron-right ${styles.caret}`}/>
            <span>{properties[KEY_NAME]}</span>
          </h3>
          <div className={styles.controls}>
            <a onClick={() => this.props.onPanTo(this.props.productLine)} title="View on Map">
              <i className="fa fa-globe"/>
            </a>
          </div>
        </section>
        <section className={styles.details}>
          <div className={styles.metadata}>
            <dl>
              <dt>Scheduling</dt>
              <dd>{formatDate(properties[KEY_STARTS_ON])} &mdash; {formatDate(properties[KEY_EXPIRES_ON]) || 'Forever'}</dd>
              <dt>Algorithm</dt>
              <dd>{properties[KEY_ALGORITHM_NAME]}</dd>
              <dt>Cloud Cover</dt>
              <dd>{properties[KEY_IMAGE_CLOUDCOVER]}% or less</dd>
              {/*
              <dt>Compute Mask</dt>
              <dd>{computeMask}</dd>
              */}
              <dt>Spatial Filter</dt>
              <dd>{titleCase(properties[KEY_SPATIAL_FILTER_NAME]) || 'None'}</dd>
              <dt>Owner</dt>
              <dd>{properties[KEY_OWNER]}</dd>
              <dt>Date Created</dt>
              <dd>{formatDate(properties[KEY_CREATED_ON])}</dd>
            </dl>
          </div>
          <ActivityTable
            className={styles.activityTable}
            duration={duration}
            durations={[
              LAST_24_HOURS,
              LAST_7_DAYS,
              LAST_30_DAYS,
              SINCE_CREATION,
            ]}
            error={this.state.error}
            isLoading={this.state.isFetchingJobs}
            jobs={this.state.jobs}
            selectedJobIds={this.state.selectedJobs.map(j => j.id)}
            sessionToken={this.props.sessionToken}
            onDurationChange={this._handleDurationChange}
            onHoverIn={this.props.onJobHoverIn}
            onHoverOut={this.props.onJobHoverOut}
            onRowClick={this._handleJobRowClick}
          />
        </section>
      </li>
    )
  }

  _fetchJobs() {
    this.setState({ isFetchingJobs: true })
    this.props.onFetchJobs(this.props.productLine.id, generateSinceDate(this.state.duration, this.props.productLine))
      .then(jobs => this.setState({ jobs, isFetchingJobs: false }))
      .catch(error => this.setState({ error, isFetchingJobs: false }))
  }

  _handleDurationChange(duration) {
    this.setState({ duration })
  }

  _handleExpansionToggle() {
    this.setState({ isExpanded: !this.state.isExpanded })
    // TODO -- scroll to positioning
  }

  _handleJobRowClick(job) {
    if (this.state.selectedJobs.some(j => j.id === job.id)) {
      this.props.onJobDeselect()
      this.setState({ selectedJobs: [] })
    }
    else {
      this.props.onJobSelect(job)
      this.setState({ selectedJobs: [job] })
    }
  }
}

//
// Helpers
//

function formatDate(input) {
  const date = moment(input)
  if (date.isValid()) {
    return date.format('MM/DD/YYYY')
  }
  return null
}

function generateSinceDate(offset, productLine) {
  if (offset === SINCE_CREATION.value) {
    return productLine.properties[KEY_CREATED_ON]
  }
  return moment()
    .utc()
    .subtract(moment.duration(offset))
    .startOf(offset === LAST_24_HOURS.value ? 'hour' : 'day')
    .toISOString()
}

function titleCase(s) {
  return s.replace(/((?:^|\s)[a-z])/g, c => c.toUpperCase())
}
