import { createActions } from 'reflux';
import { getFundingInfo } from '../api';

const FundingInfoActions = createActions({
  loadFunding: {},
  loadProgress: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on FundingInfoActions.load()
FundingInfoActions.loadFunding.listen(() => {
  getFundingInfo(FundingInfoActions.loadProgress)
    .then(FundingInfoActions.loadCompleted)
    .catch(FundingInfoActions.loadFailed);
});

export default FundingInfoActions;
