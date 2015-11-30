import { createActions } from 'reflux';
import { getIndicator } from '../api';

let INDICATOR_NAME = '';
const indicatorsActions = createActions({
  loadData: {},
  loadProgress: {},
  loadDataCompleted: {},
  loadDataFailed: {},
  updateIndicator: {},
});

/**
 * [description]
 * @param  {[type]} (name [description]
 * @return {[type]}       [description]
 */
indicatorsActions.updateIndicator.listen((name) => {
  INDICATOR_NAME = name;
  indicatorsActions.loadData();
});

// SIDE-EFFECT: xhr request is triggered on indicatorsActions.loadData()
indicatorsActions.loadData.listen(() => {
  getIndicator(INDICATOR_NAME, indicatorsActions.loadProgress)
  .then(indicatorsActions
  .loadDataCompleted)
  .catch(indicatorsActions.loadDataFailed);
});

export default indicatorsActions;
