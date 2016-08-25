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

import React from 'react'
import {connect} from 'react-redux'
import ProductLine from './ProductLine'
import {
  clearHoveredProductLineJob,
  clearSelectedProductLineJob,
  fetchProductLines,
  fetchProductLineJobs,
  hoverProductLineJob,
  selectProductLineJob,
} from '../actions'

const styles = require('./ProductLineList.css')

export class ProductLineList extends React.Component {
  static propTypes = {
    error:             React.PropTypes.object,
    isFetching:        React.PropTypes.bool.isRequired,
    jobs:              React.PropTypes.object.isRequired,
    productLines:      React.PropTypes.array.isRequired,
    selectedJobIds:    React.PropTypes.array.isRequired,
    fetchProductLines: React.PropTypes.func.isRequired,
    onFetchJobs:       React.PropTypes.func.isRequired,
    onJobHoverIn:      React.PropTypes.func.isRequired,
    onJobHoverOut:     React.PropTypes.func.isRequired,
    onJobSelect:       React.PropTypes.func.isRequired,
    onJobDeselect:     React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchProductLines()
  }

  render() {
    return (
      <div className={styles.root}>
        <header>
          <h1>Product Lines</h1>
        </header>
        <ul>
          {this.props.productLines.map(productLine => (
            <ProductLine
              className={styles.listItem}
              key={productLine.id}
              productLine={productLine}
              jobs={this.props.jobs[productLine.id]}
              selectedJobIds={this.props.selectedJobIds}
              fetchJobs={sinceDate => this.props.onFetchJobs(productLine.id, sinceDate)}
              onJobHoverIn={this.props.onJobHoverIn}
              onJobHoverOut={this.props.onJobHoverOut}
              onJobSelect={this.props.onJobSelect}
              onJobDeselect={this.props.onJobDeselect}
            />
          ))}
          {this.props.isFetching && (
            <li className={styles.placeholder}>
              Loading Product Lines
            </li>
          )}
          {this.props.error && (
            <li className={styles.error}>
              <h4><i className="fa fa-warning"/> {this.props.error.code ? 'Communication' : 'Application'} Error</h4>
              <p>{this.props.error.code
                ? 'Cannot communicate with the server'
                : 'An error is preventing the display of product lines'
              }. (<code>{this.props.error.message}</code>)</p>
              <button onClick={this.props.fetchProductLines}>Retry</button>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default connect(state => ({
  isFetching:     state.productLines.fetching,
  error:          state.productLines.error,
  jobs:           state.productLineJobs,
  productLines:   state.productLines.records,
  selectedJobIds: state.productLineJobs.selection.map(j => j.id),
}), dispatch => ({
  fetchProductLines: () => dispatch(fetchProductLines()),
  onFetchJobs:       (id, sinceDate) => dispatch(fetchProductLineJobs(id, sinceDate)),
  onJobHoverIn:      (job) => dispatch(hoverProductLineJob(job)),
  onJobHoverOut:     () => dispatch(clearHoveredProductLineJob()),
  onJobSelect:       (job) => dispatch(selectProductLineJob(job)),
  onJobDeselect:     () => dispatch(clearSelectedProductLineJob()),
}))(ProductLineList)