import React, { PropTypes } from 'react';
import {  Map, TileLayer } from 'react-leaflet';
import BoundsMap from '../leaflet/bounds-map';

require('stylesheets/map/map');

const position = [14, -14];
const MainMap = React.createClass({
  render() {
    return (
      <div className="main-map">
        <div className="map-container">
           <BoundsMap
                bounds={[[-0.8, 29.3], [-11.8, 40.8]]}
                className="leaflet-map">
                <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BoundsMap>
         </div>
      </div>
    );
  },
});

export default MainMap;