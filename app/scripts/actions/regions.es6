import { createActions } from 'reflux';
import { getRegions } from '../api';

const RegionsActions = createActions({
  loadRegions: {},
  loadProgress: {},
  loadRegionsCompleted: {},
  loadRegionsFailed: {},
  setYear: {},
});

// SIDE-EFFECT: xhr request is triggered on RegionsActions.loadRegions()
RegionsActions.loadRegions.listen(() => {
  getRegions(RegionsActions.loadProgress)
    .then(RegionsActions.loadRegionsCompleted)
    .catch(RegionsActions.loadRegionsFailed);
});


export default RegionsActions;
