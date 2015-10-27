import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadDataCompleted } from '../actions/primarygri';


const ColorClass = {
  "lessthan25": {
    "color":"#fee5d9"
  },
  "lessthan50": {
    "color":"#fcae91"
  },
  "lessthan75": {
    "color":"#fb6a4a"
  },
  "lessthan100": {
    "color":"#de2d26"
  },
  "lessthan125": {
    "color":"#a50f15"
  }
}

function getNormalizeValue(record){
	if (value<25){
 		return Colorclass.lessthan25.color;
 	} else if(value<50){
 		return ColorClass.lessthan50.color;
 	} else if(value<75) {
 		return ColorClass.lessthan75.color;
 	} else if (value<100){
 		return ColorClass.lessthan100.color;
 	} else {
 		return ColorClass.lessthan125.color;
 	}
}

const PrimaryGirStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
  	this.listenTo(loadDataCompleted, 'loadData');
  },
  loadData(data) {
  	this.setData(data);
  },
});

export default PrimaryGirStore;
