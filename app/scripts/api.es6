/* eslint camelcase: 0 */  // snake_case query params are not set by us

const layers = q => `layers/${q}.json`;
const  data = q => `data/${q}.json`;

const get = url =>
  fetch(url).then(resp => resp.json());

export const getStructures = () =>
	get(data('projects'));

export const getFundingInfo = () =>
	get(data('fundinginfo'));

export const getIndicator = filename =>
	get(data(filename));

export const getRegions = () =>
	get(layers('sen_regions'));
