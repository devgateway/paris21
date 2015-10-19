import React, { PropTypes } from 'react';
import {  Map, TileLayer, Marker } from 'react-leaflet';
import { connect } from 'reflux';
import BoundsMap from '../leaflet/bounds-map';
import SpinnerModal from '../misc/spinner-modal';
import { load } from '../../actions/education';
import Education from '../../stores/education';

require('stylesheets/map/map');

const MainMap = React.createClass({
   mixins: [
    connect(Education, 'education'),
  ],
  componentWillMount() {
    load();
  },
  render() {
    return (
      <div className="main-map">
        <div className="map-container">
           <BoundsMap
                bounds={[[15.71, -19.13], [12.76, -10.43]]}
                className="leaflet-map">
                <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {this.state.education.map(edupoint =>
                  <Marker position={edupoint.position}>
                  </Marker>
                )}
           </BoundsMap>
           <div className="messages">
              There are {this.state.education.length} structures loaded.
           </div>
         </div>
      </div>
    );
  },
});

export default MainMap;