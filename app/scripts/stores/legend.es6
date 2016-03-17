/*eslint no-useless-concat: 2*/
import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import RegionsStore from './regions';
import has from 'lodash/object/has';

/**
 * [computeData description]
 * @param  {[Object]} data [Features modified after indicators are loaded]
 * @return {[Object]}      [Object state used to contruc the legend]
 */
function computeData(data) {
  const colors = data.colors;
  const ranges = data.jenks;
  const indicator = data.indicator

  const state = {
    classOne: colors[0],
    classTwo: colors[1],
    classThree: colors[2],
    classFour: colors[3],
    classFive: colors[4],
    classSix: colors[5],
    rangeOne: `${ranges[0]} % - ${ranges[1]} %`,
    rangeTwo: `${ranges[1]} % -  ${ranges[2]} %`,
    rangeThree: `${ranges[2]} % -  ${ranges[3]} %`,
    rangeFour: `${ranges[3]} % -  ${ranges[4]} %`,
    rangeFive: `${ranges[4]} % -  ${ranges[5]} %`,
    rangeSix: `${ranges[5]} % -  ${ranges[6]} %`,
  };
  /* remove percentage sign when needed */
  if (indicator.endsWith('student') || indicator.endsWith('habitants') || indicator.endsWith('students')){
      state.rangeOne = state.rangeOne.replace(new RegExp('%', 'g'), '');
      state.rangeTwo = state.rangeTwo.replace(new RegExp('%', 'g'), '');
      state.rangeThree = state.rangeThree.replace(new RegExp('%', 'g'), '');
      state.rangeFour = state.rangeFour.replace(new RegExp('%', 'g'), '');
      state.rangeFive = state.rangeFive.replace(new RegExp('%', 'g'), '');
      state.rangeSix = state.rangeSix.replace(new RegExp('%', 'g'), '');
  }
  return state;
}

const LegendStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(RegionsStore, 'setLegend');
  },
  setLegend(data) {
    if (has(data.regions, 'colors')) {
      this.setData(computeData(data.regions));
    }
  },
});


export default LegendStore;
