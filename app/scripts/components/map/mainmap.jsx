import React, { PropTypes } from 'react';
import {  Map, TileLayer, Marker, Popup, GeoJson } from 'react-leaflet';
import { connect } from 'reflux';
import BoundsMap from '../leaflet/bounds-map';
import SpinnerModal from '../misc/spinner-modal';
import { load } from '../../actions/education';
import Education from '../../stores/education';
import { loadRegions } from '../../actions/regions';
import Regions from '../../stores/regions';
import { loadData } from '../../actions/primarygri';
import PrimaryGri from '../../stores/primarygri';

require('stylesheets/map/map');

const MainMap = React.createClass({
   mixins: [
    connect(Education, 'education'),
    connect(Regions, 'regions'),
    connect(PrimaryGri, 'primarygri'),
  ],
  componentWillMount() {
    loadData();
    loadRegions();
    load();
  },
  render() {
    var primaryGriData= <div/>;
    if (this.state.regions.regions){
        primaryGriData=<GeoJson map="MainMap" data={this.state.regions.regions} style={
          function(feature){
            console.log(feature.properties.ADM1_NAME);
          if ('Dakar' == feature.properties.ADM1_NAME) {
            return {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 1,
                fillColor: '#a50f15'
            };
        }else if ('Kolda' == feature.properties.ADM1_NAME) {
            return {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 1,
                fillColor: '#de2d26'
            };
        }else if ('Kaffrine' == feature.properties.ADM1_NAME) {
            return {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 1,
                fillColor: '#fcae91'
            }; 
          } else {
            return {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 1,
                fillColor: '#fee5d9'
            };
          }
        }
    }/>
    }
    return (
      <div className="main-map">
        <div className="map-container">
           <BoundsMap
                bounds={[[15.71, -19.13], [12.76, -10.43]]}
                className="leaflet-map">
                <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {this.state.education.map(function (item) {
                  return [
                   <Marker position={item.position}>
                      <Popup><span>{item.TITLE}</span></Popup> 
                   </Marker>
                   ];
                })}
              {primaryGriData}
           </BoundsMap>
           <div className="messages">
              There are {this.state.education.length} Education structures loaded.
           </div>
         </div>
      </div>
    );
  },
});

export default MainMap;