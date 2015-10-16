/* eslint camelcase: 0 */  // snake_case query params are not set by us

const  data = q => `data/${q}.json`;
const get = url =>
  fetch(url).then(resp => resp.json());


export const getEducation = () =>
  get(data('education'));