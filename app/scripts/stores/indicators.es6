import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadDataCompleted, updateIndicator } from '../actions/indicators';

const IndicatorsStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(loadDataCompleted, 'loadData');
    this.listenTo(updateIndicator, 'loadData');
  },
  loadData(data) {
    if (data instanceof Array) {
      data.name = this.name;
      this.setData({indicators: data});
    } else {
      this.name = data;
    }
  },
});

export default IndicatorsStore;
