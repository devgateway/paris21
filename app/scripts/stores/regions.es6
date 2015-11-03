import find from 'lodash/collection/find';
import forEach from 'lodash/collection/forEach';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadRegionsCompleted } from '../actions/regions';
import indicatorStore from './indicators';
import { loadData } from '../actions/indicators';

const ColorClass = {
  'lessthan45': {
    'color': '#feedde',
  },
  'lessthan50': {
    'color': '#fdd0a2',
  },
  'lessthan65': {
    'color': '#fdae6b',
  },
  'lessthan75': {
    'color': '#f16913',
  },
  'lessthan85': {
    'color': '#d94801',
  },
  'lessthan95': {
    'color': '#d94801',
  },
  'lessthan100': {
    'color': '#8c2d04',
  },
};

/**
 * [getNormalizeValue description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function getNormalizeValue(value) {
  if (value < 45) {
    return ColorClass.lessthan45.color;
  } else if (value < 50) {
    return ColorClass.lessthan50.color;
  } else if (value < 65) {
    return ColorClass.lessthan65.color;
  } else if (value < 75) {
    return ColorClass.lessthan75.color;
  } else if (value < 85) {
    return ColorClass.lessthan85.color;
  } else if (value < 95) {
    return ColorClass.lessthan95.color;
  } else {
    return ColorClass.lessthan100.color;
  }
}

/**
 * [setStyle description]
 * @param {[type]} features   [description]
 * @param {[type]} indicators [description]
 * @return {[type]}       [description]
 */
function setStyle(features, indicators) {
  forEach(features.features, function(feature) {
    const values = find(indicators.indicators, function(item) {
      return (item.REGION === feature.properties.NAME_1);
    });

    if (values) {
      const color = getNormalizeValue(values[2010]);
      feature.style = {
        weight: 2,
        opacity: 0.1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: color};
    } else {
      feature.style = {
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1,
        fillColor: '#7a859c'};
    }
  });
  return features;
}

const RegionsStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(loadRegionsCompleted, 'loadRegions');
    this.listenTo(indicatorStore, 'updateFeatures');
  },
  updateFeatures(indicators) {
    const processed = setStyle(this.data.regions, indicators);
    /* Force map to remove the initial layer*/
    this.setData({regions: null});
    this.setData({regions: processed});
  },
  loadRegions(data) {
    this.setData({regions: data});
    loadData();
  },
});

export default RegionsStore;

