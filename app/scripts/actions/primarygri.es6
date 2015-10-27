import { createActions } from 'reflux';
import { getPrimaryGri } from '../api';

const primaryGriActions = createActions({
  loadData: {},
  loadProgress: {},
  loadDataCompleted: {},
  loadDataFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on primaryGriActions.loadRegions()
primaryGriActions.loadData.listen(() => {
  getPrimaryGri(primaryGriActions.loadProgress)
    .then(primaryGriActions.loadDataCompleted)
    .catch(primaryGriActions.loadDataFailed);
});

export default primaryGriActions;
