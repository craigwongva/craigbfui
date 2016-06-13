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
import openlayers from 'openlayers'

export default class ExportControl extends openlayers.control.Control {
  constructor(className) {
    const element = document.createElement('div')
    super({element})
    element.className = `${className || ''} ol-unselectable ol-control`
    element.title = 'Click to export an image of this map'
    element.innerHTML = '<a href="map.png"><i class="fa fa-download"/></a>'
    const hyperlink = this.element.firstChild
    hyperlink.addEventListener('click',  this._clicked.bind(this))

  }

  _clicked() {
    const map = this.getMap()
    const hyperlink = this.element.firstChild
    const timestamp = new Date().toISOString().replace(/(\D+|\.\d+)/g, '')

    hyperlink.download = `BEACHFRONT_EXPORT_${timestamp}.png`
    map.once('postcompose', event => {
      const canvas = event.context.canvas

      var imageData = event.context.getImageData(0,0,canvas.width,canvas.height)

      var newCanvas = document.querySelector('canvas')
      var context = newCanvas.getContext('2d')

      newCanvas.width = canvas.width
      newCanvas.height = canvas.height

      context.putImageData(imageData, 0, 0)

      var extent = map.getView().calculateExtent(map.getSize())
      extent = openlayers.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:3857')

      context.font = "14px serif"
      context.fillText('Timestamp: '+timestamp, 0, (newCanvas.height - 30))
      context.fillText('Viewport: '+extent, 0, (newCanvas.height - 10))

      hyperlink.href = newCanvas.toDataURL()
      newCanvas = null
    })
    map.renderSync()


  }
}
