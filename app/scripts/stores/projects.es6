import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { filter, loadCompleted } from '../actions/projects';
import { setYear } from '../actions/regions';

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

const ProjectsStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(loadCompleted, 'loadData');
    this.listenTo(filter, 'filterProjects');
    this.listenTo(setYear, 'filterByYear');
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


  filterByYear(nothing, year = 'all') {
    if (year !== 'all') {
      const projects = this.unFilteredData.filter(function(i) {
        return (parseInt(year, 10) <= parseInt(i.END_DATE.substring(6, 10), 10) && parseInt(year, 10) >= parseInt(i.START_DATE.substring(6, 10), 10));
      });
      this.setData(projects);
    } else {
      this.setData(this.unFilteredData);
    }
  },
});

export default ProjectsStore;
