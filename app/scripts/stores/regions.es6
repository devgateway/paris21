import find from 'lodash/collection/find';
import forEach from 'lodash/collection/forEach';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadRegionsCompleted, setYear} from '../actions/regions';
import indicatorStore from './indicators';
import { loadData } from '../actions/indicators';

const ColorClass = {
  'lessthan45': {
    'color': '#ece7f2',
  },
  'lessthan55': {
    'color': '#d0d1e6',
  },
  'lessthan65': {
    'color': '#a6bddb',
  },
  'lessthan75': {
    'color': '#74a9cf',
  },
  'lessthan85': {
    'color': '#3690c0',
  },
  'lessthan95': {
    'color': '#0570b0',
  },
  'lessthan105': {
    'color': '#045a8d',
  },
  'lessthan150': {
    'color': '#023858',
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
  } else if (value < 55) {
    return ColorClass.lessthan55.color;
  } else if (value < 65) {
    return ColorClass.lessthan65.color;
  } else if (value < 75) {
    return ColorClass.lessthan75.color;
  } else if (value < 85) {
    return ColorClass.lessthan85.color;
  } else if (value < 95) {
    return ColorClass.lessthan95.color;
  } else if (value < 105) {
    return ColorClass.lessthan105.color;
  } else {
    return ColorClass.lessthan150.color;
  }
}

/**
 * [setStyle description]
 * @param {[type]} features   [description]
 * @param {[type]} indicators [description]
 * @return {[type]}       [description]
 */
function setStyle(features, indicators, year) {
  forEach(features.features, function(feature) {
    const values = find(indicators.indicators, function(item) {
      return (item.REGION === feature.properties.NAME_1);
    });

    if (values) {
      const color = getNormalizeValue(values[year]);
      feature.style = {
        weight: 2,
        opacity: 0.1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8,
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
    this.listenTo(setYear, 'updateFeatures');
    this.listenTo(indicatorStore, 'updateFeatures');
  },
  updateFeatures(indicators = this.indicators, year = 2010) {
    if (indicators){
      this.indicators = indicators;
    }
    const processed = setStyle(this.data.regions, this.indicators, year);
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

