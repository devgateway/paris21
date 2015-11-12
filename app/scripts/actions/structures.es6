import { createActions } from 'reflux';
import { getStructures } from '../api';

const StructuresActions = createActions({
  load: {},
  loadProgress: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on StructuresActions.load()
StructuresActions.load.listen(() => {
  getStructures(StructuresActions.loadProgress)
    .then(StructuresActions.loadCompleted)
    .catch(StructuresActions.loadFailed);
});

export default StructuresActions;
