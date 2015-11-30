import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import selectYear from '../actions/years';


const YearsStore = createStore({
  initialData: '2010',
  mixins: [SaneStore],
  init() {
    this.listenTo(selectYear, 'update');
  },
  update(year) {
    this.setData(year);
  },
});

export default YearsStore;
