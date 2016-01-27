import { createActions } from 'reflux';
import { getIndicatorList } from '../api';

let INDICATOR_NAME = '';
const indicatorsListActions = createActions({
  loadData: {},
  loadProgress: {},
  loadDataCompleted: {},
  loadDataFailed: {},
});


// SIDE-EFFECT: xhr request is triggered on FundingInfoActions.load()
indicatorsListActions.loadData.listen(() => {
  getIndicatorList(indicatorsListActions.loadProgress)
    .then(indicatorsListActions.loadDataCompleted)
    .catch(indicatorsListActions.loadDataFailed);
});

export default indicatorsListActions;
