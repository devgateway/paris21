import { createActions } from 'reflux';
import { getAgriculture } from '../api';

const agricultureActions = createActions({
  load: {},
  loadProgress: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on agricultureActions.load()
agricultureActions.load.listen(() => {
  getAgriculture(agricultureActions.loadProgress)
    .then(agricultureActions.loadCompleted)
    .catch(agricultureActions.loadFailed);
});

export default agricultureActions;
