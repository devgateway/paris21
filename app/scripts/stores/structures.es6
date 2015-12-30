import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { filter, loadCompleted } from '../actions/structures';

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

const StructuresStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(loadCompleted, 'loadData');
    this.listenTo(filter, 'filterProjects');
  },
  loadData(data) {
    const processed = data.map(pullLatLng);
    this.unFilteredData = processed;
    this.setData(this.unFilteredData);
  },
  filterProjects(filtered = 'All') {
    if (filtered === 'All') {
      this.setData(this.unFilteredData);
    } else {
      this.data  = this.unFilteredData;
      const projects = this.data.filter(function(i) {
        return filtered.toString() === i.SUBSECTOR_1.toString();
      });
      this.setData(projects);
    }
  },
});


export default StructuresStore;
