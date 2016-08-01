import React from 'react';
import Leaflet from 'leaflet';
import MarkerPopup from './MarkerPopup';
import { MapLayer } from 'react-leaflet';

require('leaflet.markercluster');
//require('stylesheets/leaflet/divicon');
require('stylesheets/leaflet/MarkerCluster');
require('stylesheets/leaflet/MarkerCluster.Default');

class MarkerCluster extends MapLayer {
  componentWillMount() {
    super.componentWillMount();
    this.leafletElement = Leaflet.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        animateAddingMarkers: true
      });
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    // add markers to cluster layer
    if (nextProps.newMarkerData.length > 0 && !nextProps.isRendered) {
      const markers = Object.assign({}, this.props.markers);
      const newMarkers = [];

      nextProps.newMarkerData.forEach((obj) => {
        let markerPopup = null;
        let divIcon = null;
        if (nextProps.type === 'structure' ) {
          markerPopup = React.renderToStaticMarkup(
          <MarkerPopup
              donors = {obj.DONOR}
              title = {obj.TITLE}
              type = {'structure'}/>);
          divIcon = Leaflet.icon({
            iconUrl: 'images/school.png',
            iconSize: [29, 34], // size of the icon
          });
        } else {
          markerPopup = React.renderToStaticMarkup(
          <MarkerPopup
              ampid = {obj.ACTIVITYID}
              commitments = {this.formaNnumber(obj.TOTAL_COMMITMENTS)}
              description = {obj.DESCRIPTION}
              disbursement = {this.formaNnumber(obj.TOTAL_DISBURSEMENT)}
              donors = {obj.DONOR}
              enddate = {obj.END_DATE}
              sector = {obj.SECTORS}
              startdate = {obj.START_DATE}
              title = {obj.TITLE}
              type = {'project'}/>);
          divIcon = Leaflet.icon({
            iconUrl: 'images/project.png',
            iconSize: [28, 28], // size of the icon
          });
        }
        const leafletMarker = Leaflet.marker(obj.position, {icon: divIcon})
          .bindPopup(markerPopup, {maxHeight: 400, maxWidth: 310, minWidth: 250})
          .on('click', () => this.props.map.panTo(obj.position));

        markers[obj.PROJECT_ID] = leafletMarker;
        newMarkers.push(leafletMarker);
      });

      this.leafletElement.clearLayers();
      this.leafletElement.addLayers(newMarkers);
    }

    // zoom to particular marker
    if (Object.keys(nextProps.focusMarker).length > 0) {
      const marker = this.props.markers[nextProps.focusMarker.id];

      this.leafletElement.zoomToShowLayer(marker, () => {
        this.props.map.panTo(nextProps.focusMarker.position);
        marker.openPopup();
      });
    }
  }

  shouldComponentUpdate() {
    return false;
  }

   /**
   * [formaNnumber description]
   * @param  {[type]} n [description]
   * @return {[type]}   [description]
   */
  formaNnumber(n) {
    if (n !== '0' && n !== undefined) {
      return n;
    } else {
      return '0';
    }
  }

  render() {
    return null;
  }
}

MarkerCluster.propTypes = {
  focusMarker: React.PropTypes.object,
  map: React.PropTypes.object,
  markers: React.PropTypes.object,
  newMarkerData: React.PropTypes.array,
  type: React.PropTypes.string,
  updateMarkers: React.PropTypes.func,
};

MarkerCluster.defaultProps = {
  markers: {},
  newMarkerData: [],
  focusMarker: {},
};

export default MarkerCluster;
