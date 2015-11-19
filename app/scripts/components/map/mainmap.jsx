import React from 'react';
import { TileLayer, GeoJson } from 'react-leaflet';
import { connect } from 'reflux';
import BoundsMap from '../leaflet/bounds-map';
import { load } from '../../actions/structures';
import Structures from '../../stores/structures';
import { loadRegions } from '../../actions/regions';
import Regions from '../../stores/regions';
import PrimaryGri from '../../stores/indicators';
import ClusteredWaterpoints from '../leaflet/clustered-points';
import Legend from './legend';

require('stylesheets/map/map');

const MainMap = React.createClass({
  mixins: [
    connect(Structures, 'structures'),
    connect(Regions, 'regions'),
    connect(PrimaryGri, 'indicators'),
  ],
  componentWillMount() {
    load();
    loadRegions();
  },

  render() {
    let primaryGriData = <div/>;
    if (this.state.regions.regions) {
      primaryGriData = (<GeoJson data = {this.state.regions.regions} map="MainMap"
          style = {
          function(feature) {
            if (feature.style) {
              return feature.style;
            } else {
              return  {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 1,
                fillColor: '#fee5d9'};
            }
          }
      }/>);
    }

    return (
      <div className="main-map">
        <div className="map-container">
           <BoundsMap
               bounds={[[16.00, -21.13], [12.76, -10.43]]}
               className="leaflet-map">
                <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClusteredWaterpoints points={this.state.structures}/>
                {primaryGriData}
                <Legend/>
           </BoundsMap>
         </div>
      </div>
    );
  },
});

export default MainMap;
