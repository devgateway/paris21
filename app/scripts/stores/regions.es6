import find from 'lodash/collection/find';
import forEach from 'lodash/collection/forEach';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadRegionsCompleted, setYear} from '../actions/regions';
import indicatorStore from './indicators';
import { loadData } from '../actions/indicators';

const ColorClass = {
  'lessthan5': {
    'color': '#67001f',
  },
  'lessthan10': {
    'color': '#b2182b',
  },
  'lessthan20': {
    'color': '#d6604d',
  },
  'lessthan30': {
    'color': '#f4a582',
  },
  'lessthan40': {
    'color': '#fddbc7',
  },
  'lessthan50': {
    'color': '#f7f7f7',
  },
  'lessthan60': {
    'color': '#92c5de',
  },
  'lessthan70': {
    'color': '#4393c3',
  },
  'lessthan80': {
    'color': '#2166ac',
  },
  'other': {
    'color': '#053061',
  },
};

/**
 * [getNormalizeValue description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function getNormalizeValue(value) {
  if (value < 5) {
    return ColorClass.lessthan5.color;
  } else if (value < 10) {
    return ColorClass.lessthan10.color;
  } else if (value < 20) {
    return ColorClass.lessthan20.color;
  } else if (value < 30) {
    return ColorClass.lessthan30.color;
  } else if (value < 40) {
    return ColorClass.lessthan40.color;
  } else if (value < 50) {
    return ColorClass.lessthan50.color;
  } else if (value < 60) {
    return ColorClass.lessthan60.color;
  } else if (value < 70) {
    return ColorClass.lessthan70.color;
  } else if (value < 80) {
    return ColorClass.lessthan80.color;
  } else {
    return ColorClass.other.color;
  }
}

/**
 * [setStyle description]
 * @param {[type]} features   [description]
 * @param {[type]} indicators [description]
 * @param {[type]} year       [description]
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
    if (indicators) {
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

