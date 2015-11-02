import { createActions } from 'reflux';
import { getPrimaryGri } from '../api';

const indicatorsActions = createActions({
  loadData: {},
  loadProgress: {},
  loadDataCompleted: {},
  loadDataFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on indicatorsActions.loadRegions()
indicatorsActions.loadData.listen(() => {
  getPrimaryGri(indicatorsActions.loadProgress)
    .then(indicatorsActions.loadDataCompleted)
    .catch(indicatorsActions.loadDataFailed);
});

export default indicatorsActions;
