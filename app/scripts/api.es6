/* eslint camelcase: 0 */  // snake_case query params are not set by us
require('es6-promise').polyfill();

const layers = q => `layers/${q}.json`;
const  data = q => `data/${q}.json`;

const get = url =>
  fetch(url).then(resp => resp.json());

export const getStructures = () =>
	get(data('structures'));

export const getProjects = () =>
	get(data('projects'));

export const getFundingInfo = () =>
	get(data('fundinginfo'));

export const getIndicator = filename =>
	get(data(filename));

export const getIndicatorList = () =>
	get(data('indicatorslist'));

export const getRegions = () =>
	get(layers('sen_dep'));
