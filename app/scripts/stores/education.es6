import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadProgress, loadCompleted } from '../actions/education';

/**
 * @param {object} record The structure database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function pullLatLng(record) {
  const pulled = {};
  for (const k in record) {
    if (record.hasOwnProperty(k) && k !== 'LATITUDE' && k !== 'LONGITUDE') {
      pulled[k] = record[k];
    }
  }
  pulled.position = [record.LATITUDE, record.LONGITUDE];
  return pulled;
}

const EducationStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(loadProgress, 'loadData');
    this.listenTo(loadCompleted, 'loadData');
  },
  loadData(data) {
    const processed = data.map(pullLatLng);
    this.setData(processed);
  },
});


export default EducationStore;
