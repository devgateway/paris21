import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import showStructures from '../actions/showstructures';


const showStructuresStore = createStore({
  initialData: false,
  mixins: [SaneStore],
  init() {
    this.listenTo(showStructures, 'setVisible');
  },
  setVisible(arg = false) {
  	this.setData(arg);
  },
});


export default showStructuresStore;
