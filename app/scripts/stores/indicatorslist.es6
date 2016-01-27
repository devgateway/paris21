import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import forEach from 'lodash/collection/forEach';
import setLanguage from '../actions/lang';
import { loadDataCompleted } from '../actions/indicatorslist';
import { filter } from '../actions/projects';

/**
 * [getList description]
 * @param  {[type]} data [description]
 * @param  {[type]} lang [description]
 * @return {[type]}      [description]
 */
function getList(data, lang) {
  const result = [];
  if (lang === 'en') {
    forEach(data, function(indicator) {
      indicator.nametoshow = indicator.name;
      result.push(indicator);
    });
  } else {
    forEach(data, function(indicator) {
      indicator.nametoshow = indicator.namefr;
      result.push(indicator);
    });
  }
  return result;
}

const IndicatorsList = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(filter, 'filterData');
    this.listenTo(setLanguage, 'setLanguage');
    this.listenTo(loadDataCompleted, 'loadData');
  },
  setLanguage(lang = 'en') {
    this.setData(getList(this.get(), lang));
  },
  loadData(data) {
    this.unFilteredData = data;
    this.setData(getList(data, 'en'));
  },
  filterData(key = 'All') {
    if (key === 'All') {
      this.setData(this.unFilteredData);
    } else {
      const indicators = this.unFilteredData.filter(function(i) {
        return key.toString() === i.key.toString();
      });
      this.setData(indicators);
    }
  },
});

export default IndicatorsList;
