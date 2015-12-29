import React from 'react';
import Leaflet from 'leaflet';
import MarkerPopup from './MarkerPopup';
import { MapLayer } from 'react-leaflet';

require('leaflet.markercluster');

let isRendered = false;
class MarkerCluster extends MapLayer {
  componentWillMount() {
    super.componentWillMount();
    this.leafletElement = Leaflet.markerClusterGroup();
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);

    // add markers to cluster layer
    if (nextProps.newMarkerData.length > 0 && !isRendered) {
      const markers = Object.assign({}, this.props.markers);
      const newMarkers = [];

      nextProps.newMarkerData.forEach((obj) => {
        const markerPopup = React.renderToStaticMarkup(
          <MarkerPopup
              commitments = {obj.TOTAL_COMMITMENTS}
              disbursement = {obj.TOTAL_DISBURSEMENT}
              donors = {obj.DONORS}
              title = {obj.TITLE}/>
        );

        const leafletMarker = Leaflet.marker(obj.position)
          .bindPopup(markerPopup, {maxHeight: 350, maxWidth: 250, minWidth: 250})
          .on('click', () => this.props.map.panTo(obj.position));

        markers[obj.PROJECT_ID] = leafletMarker;
        newMarkers.push(leafletMarker);
      });

      this.leafletElement.addLayers(newMarkers);
      isRendered = true;
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

  render() {
    return null;
  }
}

MarkerCluster.propTypes = {
  focusMarker: React.PropTypes.object,
  map: React.PropTypes.object,
  markers: React.PropTypes.object,
  newMarkerData: React.PropTypes.array,
  updateMarkers: React.PropTypes.func,
};

MarkerCluster.defaultProps = {
  markers: {},
  newMarkerData: [],
  focusMarker: {},
};

export default MarkerCluster;
