/* eslint camelcase: 0 */  // snake_case query params are not set by us

const  layers = q => `layers/${q}.json`;
const  data = q => `data/${q}.json`;

const get = url =>
  fetch(url).then(resp => resp.json());


export const getEducation = () =>
  get(data('education'));

export const getPrimaryGri = () =>
  get(data('primarygri'));

export const getAdm2 = () =>
  get(layers('sen_regions'));