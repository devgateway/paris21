import { createActions } from 'reflux';
import { getPrimaryGri } from '../api';

const primaryGriActions = createActions({
  loadData: {},
  loadDataCompleted: {},
  loadDataFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on primaryGriActions.loadRegions()
primaryGriActions.loadData.listen(() => {
  getData()
    .then(primaryGriActions.loadDataCompleted)
    .catch(primaryGriActions.loadDataFailed);
});

export default primaryGriActions;
