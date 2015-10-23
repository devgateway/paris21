import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadDataCompleted } from '../actions/primarygri';

const PrimaryGirStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(loadRegionsCompleted, 'loadData');
  },
  loadRegions(data) {
    this.setData({primarygri: data});
  },
});

export default PrimaryGirStore;
