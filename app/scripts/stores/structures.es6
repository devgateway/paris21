import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadCompleted } from '../actions/structures';
import ProjectsStore from './projects';
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
    this.listenTo(ProjectsStore, 'setStructures');
  },

  loadData(data) {
    const processed = data.map(pullLatLng);
    this.unFilteredData = processed;
    this.setData(this.unFilteredData);
  },

  /**
   * [setStructures description]
   * @param {[type]} data [description]
   * @return {[Json Array]} [a set of filtered structures based on projects]
   */
  setStructures(data) {
    if (this.unFilteredData) {
      const structures = this.unFilteredData.filter(function(i) {
        return (data.find(x => i.PROJECT_ID === x.ID));
      });
      this.setData(structures);
    }
  },
});


export default StructuresStore;
