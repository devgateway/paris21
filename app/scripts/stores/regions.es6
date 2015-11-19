import find from 'lodash/collection/find';
import forEach from 'lodash/collection/forEach';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadRegionsCompleted, setYear} from '../actions/regions';
import indicatorStore from './indicators';
import { loadData } from '../actions/indicators';
import { geostats } from '../utils/geostats.js';

let gs;
const Colors = ['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#2b8cbe', '#045a8d'];

/**
 * [getColor description]
 * @param  {[intger]} value [description]
 * @return {[integer]}       [returns class color]
 */
function getColor(value) {
  return Colors[gs.getClass(value)];
}

/**
 * [setStyle description]
 * @param {[Object]} features  [description]
 * @param {[Array]} indicators [description]
 * @param {[intgeger]} year    [description]
 * @return {[type]}       [description]
 */
function setStyle(features, indicators, year) {
  const values = [];
  const regions = [];
  forEach(indicators.indicators, function(indicator) {
    values.push(parseFloat(indicator[year]));
    regions.push(indicator.REGION);
  });

  gs = new geostats(values);
  const jenks = gs.getClassJenks(6);


  forEach(features.features, function(feature) {
    let index;
    const found = find(regions, function(item, key) {
      index = key;
      return (item === feature.properties.NAME_1);
    });

    if (found) {
      const color = getColor(values[index]);
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
  features.jenks = jenks;
  features.colors = Colors;
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

