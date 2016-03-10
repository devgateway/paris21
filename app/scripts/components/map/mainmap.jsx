/* eslint react/no-set-state: 0 */

import React, { PropTypes } from 'react';
import { TileLayer, GeoJson } from 'react-leaflet';
import { connect } from 'reflux';
import BoundsMap from '../leaflet/bounds-map';
import { load } from '../../actions/projects';
import Projects from '../../stores/projects';
import { load as loadstructures} from '../../actions/structures';
import Structures from '../../stores/structures';
import { loadFunding } from '../../actions/fundinginfo';
import { loadRegions } from '../../actions/regions';
import FundingInfo from '../../stores/fundinginfo';
import Regions from '../../stores/regions';
import PrimaryGri from '../../stores/indicators';
import ShowStructures from '../../stores/showstructures';
import MarkerCluster from '../leaflet/MarkerCluster';
import Legend from './legend';
import T from '../misc/t';

require('stylesheets/map/map');

const MainMap = React.createClass({
  mixins: [
    connect(Projects, 'projects'),
    connect(Regions, 'regions'),
    connect(PrimaryGri, 'indicators'),
    connect(FundingInfo, 'fundinginfo'),
    connect(Structures, 'structures'),
    connect(ShowStructures, 'showstructures'),
  ],
  componentWillMount() {
    load();
    loadRegions();
    loadFunding();
    loadstructures();
  },

  PropTypes: {
    newMarkerData: PropTypes.array.isRequired,
  },

  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent);
    }
  },

  mapZoomed(e) {
    if (e.target.getZoom() > 9) {
      this.setState({resetzoom: true});
    } else {
      this.setState({resetzoom: false});
    }
  },

  resetMap() {
    map.resetZoom(); // eslint-disable-line
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
    let Cluster = null;
    let resetZoom = null;

    if (this.state.showstructures) {
      Cluster = (<MarkerCluster newMarkerData = {this.state.structures} />);
    } else {
      Cluster = (<MarkerCluster newMarkerData = {this.state.projects} />);
    }
    if (this.state.resetzoom) {
      resetZoom = (<div className= "reset" id="reset-div" onClick={this.resetMap}><T k="map.reset" /></div>);
    }
    return (
      <div className="main-map">
        <div className="map-container">
           <BoundsMap
               bounds={[[16.00, -21.13], [12.76, -10.43]]}
               className="leaflet-map"
               onZoomend= {this.mapZoomed}>
                <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {resetZoom}
                {Cluster}
                {primaryGriData}
                <Legend/>
           </BoundsMap>
         </div>
      </div>
    );
  },
});

export default MainMap;
