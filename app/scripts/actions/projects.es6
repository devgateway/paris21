import { createActions } from 'reflux';
import { getProjects } from '../api';

const ProjetctsActions = createActions({
  load: {},
  loadProgress: {},
  loadCompleted: {},
  loadFailed: {},
  filter: {},
});

// SIDE-EFFECT: xhr request is triggered on ProjetctsActions.load()
ProjetctsActions.load.listen(() => {
  getProjects(ProjetctsActions.loadProgress)
    .then(ProjetctsActions.loadCompleted)
    .catch(ProjetctsActions.loadFailed);
});

export default ProjetctsActions;
