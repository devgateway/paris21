import find from 'lodash/collection/find';
import forEach from 'lodash/collection/forEach';
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadRegionsCompleted, setYear} from '../actions/regions';
import indicatorStore from './indicators';
import { loadData } from '../actions/indicators';
import fundingInfoStore from './fundinginfo';
import { geostats } from '../utils/geostats.js';

let gs;
let colosSchema= null;
const colors = {
  "primary": ["#f1eef6", "#d0d1e6", "#a6bddb", "#74a9cf", "#2b8cbe", "#045a8d"],
  "scondary": ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#e6550d","#a63603"],
  "preschool": ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],
  "others": ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#31a354","#006d2c"]
}


function selectColorSchema(name) {
  if (name.startsWith("primary")) {
    return colors.primary;
  } else if (name.startsWith("secondary")) {
    return colors.scondary;
  } else if ((name.startsWith("presc"))) {
    return colors.preschool;
  } else {
    return colors.others;
  }
}
/**
 * [getColor description]
 * @param  {[type]} value [description]
 * @param  {[type]} name  [description]
 * @return {[type]}       [description]
 */
function getColor(value, name) {
  return selectColorSchema(name)[gs.getClass(value)];
}

/**
 * [formaNnumber description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
function formaNnumber(n) {
  return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
/**
 * [setStyle description]
 * @param {[Object]} features  [description]
 * @param {[Array]} indicators [description]
 * @param {[intgeger]} year    [description]
 * @param {[Object]} fundinginfo    [description]
 * @return {[type]}       [description]
 */
function setStyle(features, indicators, year, fundinginfo) {
  const values = [];
  const regions = [];
  let funding = [];

  forEach(indicators.indicators, function(indicator) {
    values.push(parseFloat(indicator[year]));
    regions.push(indicator.REGION);
  });

  funding = fundinginfo.filter(function(i) {
    return year.toString() === i.YEAR.toString();
  });

  gs = new geostats(values);
  const jenks = gs.getClassJenks(6);

  if (features) {
    forEach(features.features, function(feature) {
      let index;
      const found = find(regions, function(item, key) {
        index = key;
        return (item === feature.properties.ADM2_NAME.toUpperCase());
      });

      if (found) {
        const color = getColor(values[index], indicators.indicators.name);
        feature.style = {
          weight: 2,
          opacity: 0.5,
          color: 'white',
          fillOpacity: 0.8,
          fillColor: color};
        const fundingitem = funding.filter(function(item) {
          return item.REGION === found;
        })[0];
        if (fundingitem) {
          feature.properties.popupContent = `<h3> DEPARTMENT : ${fundingitem.REGION} </h3>
          <hr></hr>
          ACTUAL COMMITMENTS : ${formaNnumber(fundingitem.ACTUAL_COMMITMENTS)} CFA <BR/>
          ACTUAL DISBURSEMENT : ${formaNnumber(fundingitem.ACTUAL_DISBURSEMENT)} CFA <BR/>
          <hr></hr>
          TOTAL COMMITMENTS : ${formaNnumber(fundingitem.TOTAL_COMMITMENTS)} CFA <BR/>
          TOTAL DISBURSEMENT : ${formaNnumber(fundingitem.TOTAL_DISBURSEMENT)} CFA`;

        } else {
          feature.properties.popupContent = 'NO DATA';
        }
      } else {
        feature.style = {
          weight: 2,
          opacity: 0.5,
          color: 'white',
          dashArray: '3',
          fillOpacity: 1,
          fillColor: '#7a859c'};
        //console.log(feature.properties.ADM2_NAME + ' not found');
      }
    });
    features.jenks = jenks;
    features.colors = selectColorSchema(indicators.indicators.name);
    features.indicator.name = indicators.indicators.name;
  }
  //debugger;
  return features;
}

const RegionsStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(loadRegionsCompleted, 'loadRegions');
    this.listenTo(setYear, 'updateFeatures');
    this.listenTo(indicatorStore, 'updateFeatures');
    this.listenTo(fundingInfoStore, 'setFunding');
  },

  setFunding(data) {
    this.fundinginfo = data;
  },

  updateFeatures(indicators = this.indicators, year = 2011) {
    if (indicators) {
      this.indicators = indicators;
    }

    if (this.indicators && this.fundinginfo) {
      const processed = setStyle(this.data.regions, this.indicators, year, this.fundinginfo);
      /* Force map to remove the initial layer*/
      this.setData({regions: null});
      this.setData({regions: processed});
    }
  },

  loadRegions(data) {
    this.setData({regions: data});
    loadData();
  },
});

export default RegionsStore;

