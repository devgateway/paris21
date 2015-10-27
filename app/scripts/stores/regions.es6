import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadRegionsCompleted } from '../actions/regions';

const RegionsStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(loadRegionsCompleted, 'loadRegions');
  },
  loadRegions(data) {
  	this.setData({regions: data});
  },
});

export default RegionsStore;
