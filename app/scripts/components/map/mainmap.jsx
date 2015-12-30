import React, { PropTypes } from 'react';
import { TileLayer, GeoJson } from 'react-leaflet';
import { connect } from 'reflux';
import BoundsMap from '../leaflet/bounds-map';
import { load } from '../../actions/structures';
import Structures from '../../stores/structures';
import { loadFunding } from '../../actions/fundinginfo';
import { loadRegions } from '../../actions/regions';
import FundingInfo from '../../stores/fundinginfo';
import Regions from '../../stores/regions';
import PrimaryGri from '../../stores/indicators';
import MarkerCluster from '../leaflet/MarkerCluster';
import Legend from './legend';

require('stylesheets/map/map');

const MainMap = React.createClass({
  mixins: [
    connect(Structures, 'structures'),
    connect(Regions, 'regions'),
    connect(PrimaryGri, 'indicators'),
    connect(FundingInfo, 'fundinginfo'),
  ],
  componentWillMount() {
    load();
    loadRegions();
    loadFunding();
  },

  PropTypes: {
    newMarkerData: PropTypes.array.isRequired,
  },

  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent);
    }
  },

  render() {
    let primaryGriData = <div/>;
    if (this.state.regions.regions) {
      primaryGriData = (<GeoJson data = {this.state.regions.regions} map="MainMap" onEachFeature= {this.onEachFeature}
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
                <MarkerCluster newMarkerData = {this.state.structures} />
                {primaryGriData}
                <Legend/>
           </BoundsMap>
         </div>
      </div>
    );
  },
});

export default MainMap;
