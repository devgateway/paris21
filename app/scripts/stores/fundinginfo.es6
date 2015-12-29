import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadCompleted } from '../actions/fundinginfo';


const FundingInfoStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(loadCompleted, 'loadData');
  },
  loadData(data) {
    this.setData(data);
  },
});


export default FundingInfoStore;
