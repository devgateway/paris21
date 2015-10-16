import { createActions } from 'reflux';
import { getEducation } from '../api';

const educationActions = createActions({
  load: {},
  loadProgress: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on educationActions.load()
educationActions.load.listen(() => {
  getEducation(educationActions.loadProgress)
    .then(educationActions.loadCompleted)
    .catch(educationActions.loadFailed);
});

export default educationActions;